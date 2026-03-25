package main

import (
	"fmt"
	"sync"
)

type Estado struct {
	mu                 sync.RWMutex
	GolesA             int    `json:"golesA"`
	GolesB             int    `json:"golesB"`
	NombreA            string `json:"nombreA"`
	NombreB            string `json:"nombreB"`
	Periodo            string `json:"periodo"`
	TarjetasRojasA     int    `json:"tarjetasRojasA"`
	TarjetasRojasB     int    `json:"tarjetasRojasB"`
	TarjetasAmarillasA int    `json:"tarjetasAmarillasA"`
	TarjetasAmarillasB int    `json:"tarjetasAmarillasB"`
	TimerActivo        bool   `json:"timerActivo"`
	TiempoActual       int    `json:"tiempoActual"`
	TiempoTotal        int    `json:"tiempoTotal"`
}

func NuevoEstado() *Estado {
	return &Estado{
		NombreA: "Equipo A",
		NombreB: "Equipo B",
		Periodo: "1T",
	}
}

func (e *Estado) ProcesarComando(cmd Comando) {
	e.mu.Lock()
	defer e.mu.Unlock()

	switch cmd.Cmd {
	case "increment_a":
		e.GolesA++
	case "decrement_a":
		if e.GolesA > 0 {
			e.GolesA--
		}
	case "increment_b":
		e.GolesB++
	case "decrement_b":
		if e.GolesB > 0 {
			e.GolesB--
		}
	case "reset":
		e.GolesA = 0
		e.GolesB = 0
		e.TarjetasRojasA = 0
		e.TarjetasRojasB = 0
		e.TarjetasAmarillasA = 0
		e.TarjetasAmarillasB = 0
	case "set_name_a":
		e.NombreA = cmd.Value
	case "set_name_b":
		e.NombreB = cmd.Value
	case "set_period":
		e.Periodo = cmd.Value
	case "tarjeta_roja_a":
		e.TarjetasRojasA++
	case "tarjeta_roja_b":
		e.TarjetasRojasB++
	case "tarjeta_amarilla_a":
		e.TarjetasAmarillasA++
	case "tarjeta_amarilla_b":
		e.TarjetasAmarillasB++
	case "tarjeta_roja_a_quitar":
		if e.TarjetasRojasA > 0 {
			e.TarjetasRojasA--
		}
	case "tarjeta_roja_b_quitar":
		if e.TarjetasRojasB > 0 {
			e.TarjetasRojasB--
		}
	case "tarjeta_amarilla_a_quitar":
		if e.TarjetasAmarillasA > 0 {
			e.TarjetasAmarillasA--
		}
	case "tarjeta_amarilla_b_quitar":
		if e.TarjetasAmarillasB > 0 {
			e.TarjetasAmarillasB--
		}
	case "timer_iniciar":
		minutos := 0
		fmt.Sscanf(cmd.Value, "%d", &minutos)
		e.TiempoTotal = minutos * 60
		e.TiempoActual = e.TiempoTotal
		e.TimerActivo = true
	case "timer_pausar":
		e.TimerActivo = false
	case "timer_reanudar":
		if e.TiempoActual > 0 {
			e.TimerActivo = true
		}
	case "timer_resetear":
		e.TimerActivo = false
		e.TiempoActual = 0
		e.TiempoTotal = 0
	case "switch_teams":
		e.NombreA, e.NombreB = e.NombreB, e.NombreA
		e.GolesA, e.GolesB = e.GolesB, e.GolesA
		e.TarjetasRojasA, e.TarjetasRojasB = e.TarjetasRojasB, e.TarjetasRojasA
		e.TarjetasAmarillasA, e.TarjetasAmarillasB = e.TarjetasAmarillasB, e.TarjetasAmarillasA
	}

}

func (e *Estado) Snapshot() Estado {
	e.mu.RLock()
	defer e.mu.RUnlock()
	return Estado{
		GolesA:             e.GolesA,
		GolesB:             e.GolesB,
		NombreA:            e.NombreA,
		NombreB:            e.NombreB,
		Periodo:            e.Periodo,
		TarjetasRojasA:     e.TarjetasRojasA,
		TarjetasRojasB:     e.TarjetasRojasB,
		TarjetasAmarillasA: e.TarjetasAmarillasA,
		TarjetasAmarillasB: e.TarjetasAmarillasB,
		TimerActivo:        e.TimerActivo,
		TiempoActual:       e.TiempoActual,
		TiempoTotal:        e.TiempoTotal,
	}
}
