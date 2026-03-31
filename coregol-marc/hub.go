package main

import (
	"encoding/json"
	"log"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

type Comando struct {
	Cmd   string `json:"cmd"`
	Value string `json:"value"`
}

type Mensaje struct {
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}

type Hub struct {
	clientes map[*websocket.Conn]bool
	mu       sync.Mutex
	estado   *Estado
}

func NuevoHub(estado *Estado) *Hub {
	return &Hub{
		clientes: make(map[*websocket.Conn]bool),
		estado:   estado,
	}
}

func (h *Hub) Registrar(conn *websocket.Conn) {
	h.mu.Lock()
	h.clientes[conn] = true
	h.mu.Unlock()
	log.Printf("Cliente conectado. Total: %d", len(h.clientes))

	// Enviar estado actual al nuevo cliente
	h.EnviarEstado(conn)
}

func (h *Hub) Desconectar(conn *websocket.Conn) {
	h.mu.Lock()
	delete(h.clientes, conn)
	h.mu.Unlock()
	conn.Close()
	log.Printf("Cliente desconectado. Total: %d", len(h.clientes))
}

func (h *Hub) EnviarEstado(conn *websocket.Conn) {
	snap := h.estado.Snapshot()
	msg := Mensaje{Type: "state", Data: snap}
	data, _ := json.Marshal(msg)
	conn.WriteMessage(websocket.TextMessage, data)
}

func (h *Hub) Broadcast() {
	snap := h.estado.Snapshot()
	msg := Mensaje{Type: "state", Data: snap}
	data, _ := json.Marshal(msg)

	h.mu.Lock()
	defer h.mu.Unlock()
	for conn := range h.clientes {
		err := conn.WriteMessage(websocket.TextMessage, data)
		if err != nil {
			conn.Close()
			delete(h.clientes, conn)
		}
	}
}

func (h *Hub) ManejarConexion(conn *websocket.Conn) {
	h.Registrar(conn)
	defer h.Desconectar(conn)

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}

		var cmd Comando
		if err := json.Unmarshal(msg, &cmd); err != nil {
			log.Println("Comando inválido:", err)
			continue
		}

		log.Printf("Comando recibido: %s | value: %s", cmd.Cmd, cmd.Value)
		h.estado.ProcesarComando(cmd)
		h.Broadcast()
	}
}

func (h *Hub) IniciarTicker() {
	ticker := time.NewTicker(1 * time.Second)
	go func() {
		for range ticker.C {
			h.estado.mu.Lock()
			if h.estado.TimerActivo {
				if h.estado.TiempoActual < h.estado.TiempoTotal {
					h.estado.TiempoActual++
				} else {
					h.estado.TimerActivo = false
				}
			}
			h.estado.mu.Unlock()

			// Broadcast solo si hay clientes
			h.mu.Lock()
			activos := len(h.clientes)
			h.mu.Unlock()
			if activos > 0 {
				h.Broadcast()
			}
		}
	}()
}
