package main

import (
	"embed"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

//go:embed frontend/marc.html
var frontendFS embed.FS

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

func main() {
	estado := NuevoEstado()
	hub := NuevoHub(estado)
	hub.IniciarTicker()

	// Servir el HTML del marcador
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		data, _ := frontendFS.ReadFile("frontend/marc.html")
		w.Header().Set("Content-Type", "text/html")
		w.Write(data)
	})

	// API REST para OBS y externos (Fase 2)
	http.HandleFunc("/api/state", func(w http.ResponseWriter, r *http.Request) {
		snap := estado.Snapshot()
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		json.NewEncoder(w).Encode(snap)
	})

	// WebSocket principal
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println("Error WS:", err)
			return
		}
		go hub.ManejarConexion(conn)
	})

	log.Println("coregol-marc corriendo en :24700")
	log.Println("Display:  http://localhost:24700")
	log.Println("API:      http://localhost:24700/api/state")
	log.Println("WebSocket: ws://localhost:24700/ws")

	if err := http.ListenAndServe(":24700", nil); err != nil {
		log.Fatal(err)
	}
}
