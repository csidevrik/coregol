package main

import (
	"context"
	"sync"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx                context.Context
	scoreA             int
	scoreB             int
	nombreA            string
	nombreB            string
	tarjetasRojasA     int
	tarjetasRojasB     int
	tarjetasAmarillasA int
	tarjetasAmarillasB int
	periodo            string // "1T" o "2T"
	timerActivo        bool
	tiempoTotal        int
	tiempoActual       int
	mutex              sync.Mutex
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		scoreA:             0,
		scoreB:             0,
		nombreA:            "Equipo A",
		nombreB:            "Equipo B",
		tarjetasRojasA:     0,
		tarjetasRojasB:     0,
		tarjetasAmarillasA: 0,
		tarjetasAmarillasB: 0,
		periodo:            "1T",
		timerActivo:        false,
		tiempoTotal:        0,
		tiempoActual:       0,
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// ============================================
// MÉTODOS PARA CONTROLAR EL MARCADOR
// ============================================

func (a *App) IncrementarEquipoA() map[string]interface{} {
	a.mutex.Lock()
	a.scoreA++
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

func (a *App) DecrementarEquipoA() map[string]interface{} {
	a.mutex.Lock()
	if a.scoreA > 0 {
		a.scoreA--
	}
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

func (a *App) IncrementarEquipoB() map[string]interface{} {
	a.mutex.Lock()
	a.scoreB++
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

func (a *App) DecrementarEquipoB() map[string]interface{} {
	a.mutex.Lock()
	if a.scoreB > 0 {
		a.scoreB--
	}
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

func (a *App) ObtenerMarcador() map[string]interface{} {
	a.mutex.Lock()
	defer a.mutex.Unlock()
	return a.getMarcadorCompleto()
}

func (a *App) ResetearMarcador() map[string]interface{} {
	a.mutex.Lock()
	a.scoreA = 0
	a.scoreB = 0
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

// ============================================
// MÉTODOS PARA TARJETAS
// ============================================

func (a *App) AgregarTarjetaRojaA() map[string]interface{} {
	a.mutex.Lock()
	a.tarjetasRojasA++
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

func (a *App) QuitarTarjetaRojaA() map[string]interface{} {
	a.mutex.Lock()
	if a.tarjetasRojasA > 0 {
		a.tarjetasRojasA--
	}
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

func (a *App) AgregarTarjetaAmarillaA() map[string]interface{} {
	a.mutex.Lock()
	a.tarjetasAmarillasA++
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

func (a *App) QuitarTarjetaAmarillaA() map[string]interface{} {
	a.mutex.Lock()
	if a.tarjetasAmarillasA > 0 {
		a.tarjetasAmarillasA--
	}
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

func (a *App) AgregarTarjetaRojaB() map[string]interface{} {
	a.mutex.Lock()
	a.tarjetasRojasB++
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

func (a *App) QuitarTarjetaRojaB() map[string]interface{} {
	a.mutex.Lock()
	if a.tarjetasRojasB > 0 {
		a.tarjetasRojasB--
	}
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

func (a *App) AgregarTarjetaAmarillaB() map[string]interface{} {
	a.mutex.Lock()
	a.tarjetasAmarillasB++
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

func (a *App) QuitarTarjetaAmarillaB() map[string]interface{} {
	a.mutex.Lock()
	if a.tarjetasAmarillasB > 0 {
		a.tarjetasAmarillasB--
	}
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

// ============================================
// MÉTODOS PARA PERIODO
// ============================================

func (a *App) CambiarPeriodo(periodo string) map[string]interface{} {
	a.mutex.Lock()
	a.periodo = periodo
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

// ============================================
// MÉTODOS PARA NOMBRES DE EQUIPOS
// ============================================

func (a *App) ActualizarNombreEquipoA(nombre string) map[string]interface{} {
	a.mutex.Lock()
	a.nombreA = nombre
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

func (a *App) ActualizarNombreEquipoB(nombre string) map[string]interface{} {
	a.mutex.Lock()
	a.nombreB = nombre
	marcador := a.getMarcadorCompleto()
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "marcador_actualizado", marcador)
	return marcador
}

// ============================================
// MÉTODOS PARA CRONÓMETRO
// ============================================

func (a *App) IniciarCronometro(minutos int) {
	a.mutex.Lock()
	a.tiempoTotal = minutos * 60
	a.tiempoActual = a.tiempoTotal
	a.timerActivo = true
	a.mutex.Unlock()
	go a.runTimer()
}

func (a *App) PausarCronometro() {
	a.mutex.Lock()
	a.timerActivo = false
	a.mutex.Unlock()
}

func (a *App) ReanudarCronometro() {
	a.mutex.Lock()
	if !a.timerActivo && a.tiempoActual > 0 {
		a.timerActivo = true
		a.mutex.Unlock()
		go a.runTimer()
		return
	}
	a.mutex.Unlock()
}

func (a *App) ResetearCronometro() {
	a.mutex.Lock()
	a.timerActivo = false
	a.tiempoActual = 0
	a.tiempoTotal = 0
	a.mutex.Unlock()
	runtime.EventsEmit(a.ctx, "timer_actualizado", map[string]interface{}{
		"tiempo": 0,
		"activo": false,
	})
}

func (a *App) runTimer() {
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		a.mutex.Lock()
		if !a.timerActivo {
			a.mutex.Unlock()
			return
		}

		if a.tiempoActual <= 0 {
			a.timerActivo = false
			a.mutex.Unlock()
			runtime.EventsEmit(a.ctx, "timer_finalizado", nil)
			return
		}

		a.tiempoActual--
		tiempo := a.tiempoActual
		activo := a.timerActivo
		a.mutex.Unlock()

		runtime.EventsEmit(a.ctx, "timer_actualizado", map[string]interface{}{
			"tiempo": tiempo,
			"activo": activo,
		})
	}
}

func (a *App) ObtenerEstadoCronometro() map[string]interface{} {
	a.mutex.Lock()
	defer a.mutex.Unlock()
	return map[string]interface{}{
		"tiempo": a.tiempoActual,
		"activo": a.timerActivo,
	}
}

// ============================================
// CONTROL DE VENTANAS
// ============================================

func (a *App) AbrirVentanaPresentacion() {
	runtime.WindowExecJS(a.ctx, "window.open('/#/presentacion', '_blank', 'fullscreen=yes')")
}

// ============================================
// HELPER PRIVADO
// ============================================

func (a *App) getMarcadorCompleto() map[string]interface{} {
	return map[string]interface{}{
		"equipoA":            a.scoreA,
		"equipoB":            a.scoreB,
		"nombreA":            a.nombreA,
		"nombreB":            a.nombreB,
		"tarjetasRojasA":     a.tarjetasRojasA,
		"tarjetasRojasB":     a.tarjetasRojasB,
		"tarjetasAmarillasA": a.tarjetasAmarillasA,
		"tarjetasAmarillasB": a.tarjetasAmarillasB,
		"periodo":            a.periodo,
	}
}
