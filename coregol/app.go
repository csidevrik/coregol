package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx     context.Context
	mutex   sync.Mutex
	wsConn  *websocket.Conn
	marcURL string

	// Cache local del estado recibido desde marc
	estadoActual map[string]interface{}

	// // Cronómetro (sigue siendo local)
	// timerActivo  bool
	// tiempoTotal  int
	// tiempoActual int
}

func NewApp() *App {
	return &App{
		marcURL: "ws://localhost:24700/ws",
		estadoActual: map[string]interface{}{
			"equipoA": 0, "equipoB": 0,
			"nombreA": "Equipo A", "nombreB": "Equipo B",
			"periodo":        "1T",
			"tarjetasRojasA": 0, "tarjetasRojasB": 0,
			"tarjetasAmarillasA": 0, "tarjetasAmarillasB": 0,
		},
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	go a.conectarMarc()
}

// ============================================
// CONEXIÓN WEBSOCKET A COREGOL-MARC
// ============================================

func (a *App) conectarMarc() {
	for {
		log.Println("Conectando a coregol-marc...")
		conn, _, err := websocket.DefaultDialer.Dial(a.marcURL, nil)
		if err != nil {
			log.Println("No se pudo conectar a marc, reintentando en 3s:", err)
			time.Sleep(3 * time.Second)
			continue
		}

		a.mutex.Lock()
		a.wsConn = conn
		a.mutex.Unlock()

		log.Println("Conectado a coregol-marc ✓")
		runtime.EventsEmit(a.ctx, "marc_conectado", true)

		// Escuchar mensajes entrantes de marc
		a.escucharMarc(conn)

		// Si se desconecta, limpiar y reintentar
		a.mutex.Lock()
		a.wsConn = nil
		a.mutex.Unlock()

		runtime.EventsEmit(a.ctx, "marc_conectado", false)
		log.Println("Desconectado de marc. Reintentando en 3s...")
		time.Sleep(3 * time.Second)
	}
}

func (a *App) escucharMarc(conn *websocket.Conn) {
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error leyendo de marc:", err)
			return
		}

		var mensaje map[string]interface{}
		if err := json.Unmarshal(msg, &mensaje); err != nil {
			continue
		}

		if mensaje["type"] == "state" {
			if data, ok := mensaje["data"].(map[string]interface{}); ok {
				a.mutex.Lock()
				a.estadoActual = data
				a.mutex.Unlock()
				// Re-emitir al frontend Wails (Dashboard.jsx lo escucha)
				runtime.EventsEmit(a.ctx, "marcador_actualizado", data)
			}
		}
	}
}

func (a *App) enviarComando(cmd string, value string) {
	a.mutex.Lock()
	conn := a.wsConn
	a.mutex.Unlock()

	if conn == nil {
		log.Println("Sin conexión a marc, comando descartado:", cmd)
		return
	}

	payload, _ := json.Marshal(map[string]string{
		"cmd":   cmd,
		"value": value,
	})

	if err := conn.WriteMessage(websocket.TextMessage, payload); err != nil {
		log.Println("Error enviando comando:", err)
	}
}

// ============================================
// MARCADOR
// ============================================

func (a *App) IncrementarEquipoA() { a.enviarComando("increment_a", "") }
func (a *App) DecrementarEquipoA() { a.enviarComando("decrement_a", "") }
func (a *App) IncrementarEquipoB() { a.enviarComando("increment_b", "") }
func (a *App) DecrementarEquipoB() { a.enviarComando("decrement_b", "") }
func (a *App) ResetearMarcador()   { a.enviarComando("reset", "") }

func (a *App) ObtenerMarcador() map[string]interface{} {
	a.mutex.Lock()
	defer a.mutex.Unlock()
	return a.estadoActual
}

// ============================================
// NOMBRES
// ============================================

func (a *App) ActualizarNombreEquipoA(nombre string) {
	a.enviarComando("set_name_a", nombre)
}

func (a *App) ActualizarNombreEquipoB(nombre string) {
	a.enviarComando("set_name_b", nombre)
}

// ============================================
// TARJETAS
// ============================================

func (a *App) AgregarTarjetaRojaA()     { a.enviarComando("tarjeta_roja_a", "") }
func (a *App) QuitarTarjetaRojaA()      { a.enviarComando("tarjeta_roja_a_quitar", "") }
func (a *App) AgregarTarjetaAmarillaA() { a.enviarComando("tarjeta_amarilla_a", "") }
func (a *App) QuitarTarjetaAmarillaA()  { a.enviarComando("tarjeta_amarilla_a_quitar", "") }
func (a *App) AgregarTarjetaRojaB()     { a.enviarComando("tarjeta_roja_b", "") }
func (a *App) QuitarTarjetaRojaB()      { a.enviarComando("tarjeta_roja_b_quitar", "") }
func (a *App) AgregarTarjetaAmarillaB() { a.enviarComando("tarjeta_amarilla_b", "") }
func (a *App) QuitarTarjetaAmarillaB()  { a.enviarComando("tarjeta_amarilla_b_quitar", "") }

// ============================================
// PERIODO
// ============================================

func (a *App) CambiarPeriodo(periodo string) {
	a.enviarComando("set_period", periodo)
}

// ============================================
// CRONÓMETRO (sigue siendo local por ahora)
// ============================================

func (a *App) IniciarCronometro(minutos int) {
	a.enviarComando("timer_iniciar", fmt.Sprintf("%d", minutos))
}

func (a *App) PausarCronometro() {
	a.enviarComando("timer_pausar", "")
}

func (a *App) ReanudarCronometro() {
	a.enviarComando("timer_reanudar", "")
}

func (a *App) ResetearCronometro() {
	a.enviarComando("timer_resetear", "")
}

func (a *App) ObtenerEstadoCronometro() map[string]interface{} {
	a.mutex.Lock()
	defer a.mutex.Unlock()
	if t, ok := a.estadoActual["tiempoActual"]; ok {
		return map[string]interface{}{
			"tiempo": t,
			"activo": a.estadoActual["timerActivo"],
		}
	}
	return map[string]interface{}{"tiempo": 0, "activo": false}
}

// func (a *App) runTimer() {
// 	ticker := time.NewTicker(1 * time.Second)
// 	defer ticker.Stop()
// 	for range ticker.C {
// 		a.mutex.Lock()
// 		if !a.timerActivo {
// 			a.mutex.Unlock()
// 			return
// 		}
// 		if a.tiempoActual <= 0 {
// 			a.timerActivo = false
// 			a.mutex.Unlock()
// 			runtime.EventsEmit(a.ctx, "timer_finalizado", nil)
// 			return
// 		}
// 		a.tiempoActual--
// 		tiempo := a.tiempoActual
// 		activo := a.timerActivo
// 		a.mutex.Unlock()
// 		runtime.EventsEmit(a.ctx, "timer_actualizado", map[string]interface{}{
// 			"tiempo": tiempo, "activo": activo,
// 		})
// 	}
// }
