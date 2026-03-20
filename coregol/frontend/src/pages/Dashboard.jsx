import { useState, useEffect } from 'react'
import { EventsOn } from '../../wailsjs/runtime/runtime'
import { 
    IncrementarEquipoA, 
    DecrementarEquipoA,
    IncrementarEquipoB,
    DecrementarEquipoB,
    ObtenerMarcador,
    ResetearMarcador,
    ActualizarNombreEquipoA,
    ActualizarNombreEquipoB,
    IniciarCronometro,
    PausarCronometro,
    ReanudarCronometro,
    ResetearCronometro,
    ObtenerEstadoCronometro,
    AbrirVentanaPresentacion
} from '../../wailsjs/go/main/App'
import './Dashboard.css'

function Dashboard() {
    const [scoreA, setScoreA] = useState(0)
    const [scoreB, setScoreB] = useState(0)
    const [nombreA, setNombreA] = useState('Equipo A')
    const [nombreB, setNombreB] = useState('Equipo B')
    const [nombreATemp, setNombreATemp] = useState('Equipo A')
    const [nombreBTemp, setNombreBTemp] = useState('Equipo B')
    const [tiempoMinutos, setTiempoMinutos] = useState(45)
    const [tiempoActual, setTiempoActual] = useState(0)
    const [timerActivo, setTimerActivo] = useState(false)

    useEffect(() => {
        // Cargar estado inicial
        const cargarEstado = async () => {
            const marcador = await ObtenerMarcador()
            setScoreA(marcador.equipoA)
            setScoreB(marcador.equipoB)
            setNombreA(marcador.nombreA)
            setNombreB(marcador.nombreB)
            setNombreATemp(marcador.nombreA)
            setNombreBTemp(marcador.nombreB)

            const timer = await ObtenerEstadoCronometro()
            setTiempoActual(timer.tiempo)
            setTimerActivo(timer.activo)
        }
        cargarEstado()

        // Escuchar eventos
        EventsOn("marcador_actualizado", (data) => {
            setScoreA(data.equipoA)
            setScoreB(data.equipoB)
            if (data.nombreA) setNombreA(data.nombreA)
            if (data.nombreB) setNombreB(data.nombreB)
        })

        EventsOn("timer_actualizado", (data) => {
            setTiempoActual(data.tiempo)
            setTimerActivo(data.activo)
        })

        EventsOn("timer_finalizado", () => {
            setTimerActivo(false)
            alert('⏰ ¡Tiempo terminado!')
        })
    }, [])

    const formatearTiempo = (segundos) => {
        const mins = Math.floor(segundos / 60)
        const secs = segundos % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleActualizarNombreA = async () => {
        await ActualizarNombreEquipoA(nombreATemp)
        setNombreA(nombreATemp)
    }

    const handleActualizarNombreB = async () => {
        await ActualizarNombreEquipoB(nombreBTemp)
        setNombreB(nombreBTemp)
    }

    const handleIniciarTimer = async () => {
        await IniciarCronometro(parseInt(tiempoMinutos))
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>🎮 Panel de Control - Marcador</h1>
                <button 
                    className="btn-presentacion"
                    onClick={AbrirVentanaPresentacion}
                >
                    📺 Abrir Vista de Presentación
                </button>
            </header>

            {/* Vista Previa */}
            <div className="vista-previa">
                <h3>Vista Previa:</h3>
                <div className="marcador-mini">
                    <div className="equipo-mini">
                        <span className="nombre">{nombreA}</span>
                        <span className="score">{scoreA}</span>
                    </div>
                    <span className="separador">-</span>
                    <div className="equipo-mini">
                        <span className="nombre">{nombreB}</span>
                        <span className="score">{scoreB}</span>
                    </div>
                </div>
                {tiempoActual > 0 && (
                    <div className="timer-preview">
                        ⏱️ {formatearTiempo(tiempoActual)}
                    </div>
                )}
            </div>

            {/* Sección de Nombres */}
            <div className="seccion-nombres">
                <h3>📝 Nombres de Equipos</h3>
                <div className="nombres-container">
                    <div className="input-grupo">
                        <label>Equipo A:</label>
                        <input 
                            type="text"
                            value={nombreATemp}
                            onChange={(e) => setNombreATemp(e.target.value)}
                            placeholder="Nombre Equipo A"
                        />
                        <button onClick={handleActualizarNombreA}>Actualizar</button>
                    </div>
                    <div className="input-grupo">
                        <label>Equipo B:</label>
                        <input 
                            type="text"
                            value={nombreBTemp}
                            onChange={(e) => setNombreBTemp(e.target.value)}
                            placeholder="Nombre Equipo B"
                        />
                        <button onClick={handleActualizarNombreB}>Actualizar</button>
                    </div>
                </div>
            </div>

            {/* Controles de Marcador */}
            <div className="controles-container">
                <div className="equipo-control">
                    <h2>{nombreA}</h2>
                    <div className="score-display">{scoreA}</div>
                    <div className="botones">
                        <button 
                            className="btn-incrementar"
                            onClick={async () => setScoreA((await IncrementarEquipoA()).equipoA)}
                        >
                            ➕ Incrementar
                        </button>
                        <button 
                            className="btn-decrementar"
                            onClick={async () => setScoreA((await DecrementarEquipoA()).equipoA)}
                        >
                            ➖ Decrementar
                        </button>
                    </div>
                </div>

                <div className="controles-centro">
                    <button 
                        className="btn-reset"
                        onClick={async () => {
                            const m = await ResetearMarcador()
                            setScoreA(m.equipoA)
                            setScoreB(m.equipoB)
                        }}
                    >
                        🔄 Resetear Marcador
                    </button>
                </div>

                <div className="equipo-control">
                    <h2>{nombreB}</h2>
                    <div className="score-display">{scoreB}</div>
                    <div className="botones">
                        <button 
                            className="btn-incrementar"
                            onClick={async () => setScoreB((await IncrementarEquipoB()).equipoB)}
                        >
                            ➕ Incrementar
                        </button>
                        <button 
                            className="btn-decrementar"
                            onClick={async () => setScoreB((await DecrementarEquipoB()).equipoB)}
                        >
                            ➖ Decrementar
                        </button>
                    </div>
                </div>
            </div>

            {/* Cronómetro */}
            <div className="seccion-cronometro">
                <h3>⏱️ Cronómetro</h3>
                <div className="cronometro-container">
                    <div className="cronometro-display">
                        {formatearTiempo(tiempoActual)}
                    </div>
                    <div className="cronometro-controles">
                        <div className="input-grupo-timer">
                            <label>Minutos:</label>
                            <input 
                                type="number"
                                value={tiempoMinutos}
                                onChange={(e) => setTiempoMinutos(e.target.value)}
                                min="1"
                                max="120"
                                disabled={timerActivo}
                            />
                        </div>
                        <button 
                            className="btn-timer"
                            onClick={handleIniciarTimer}
                            disabled={timerActivo}
                        >
                            ▶️ Iniciar
                        </button>
                        <button 
                            className="btn-timer"
                            onClick={timerActivo ? PausarCronometro : ReanudarCronometro}
                        >
                            {timerActivo ? '⏸️ Pausar' : '▶️ Reanudar'}
                        </button>
                        <button 
                            className="btn-timer"
                            onClick={ResetearCronometro}
                        >
                            🔄 Resetear
                        </button>
                    </div>
                </div>
            </div>

            <div className="instrucciones">
                <h3>ℹ️ Instrucciones:</h3>
                <ul>
                    <li>Cambia los nombres de los equipos y haz clic en "Actualizar"</li>
                    <li>Usa los botones + y - para cambiar el marcador</li>
                    <li>Configura el cronómetro e inícialo</li>
                    <li>Abre la Vista de Presentación para mostrar en otra pantalla</li>
                </ul>
            </div>
        </div>
    )
}

export default Dashboard