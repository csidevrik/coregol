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
    AgregarTarjetaRojaA,
    QuitarTarjetaRojaA,
    AgregarTarjetaAmarillaA,
    QuitarTarjetaAmarillaA,
    AgregarTarjetaRojaB,
    QuitarTarjetaRojaB,
    AgregarTarjetaAmarillaB,
    QuitarTarjetaAmarillaB,
    AgregarFaltaA,
    QuitarFaltaA,
    AgregarFaltaB,
    QuitarFaltaB,
    CambiarPeriodo,
    SwitchEquipos,
    IniciarCronometro,
    PausarCronometro,
    ReanudarCronometro,
    ResetearCronometro,
    ObtenerEstadoCronometro,
} from '../../wailsjs/go/main/App'
import './Dashboard.css'

function Dashboard() {
    const [scoreA, setScoreA]                     = useState(0)
    const [scoreB, setScoreB]                     = useState(0)
    const [nombreA, setNombreA]                   = useState('Equipo A')
    const [nombreB, setNombreB]                   = useState('Equipo B')
    const [nombreATemp, setNombreATemp]           = useState('Equipo A')
    const [nombreBTemp, setNombreBTemp]           = useState('Equipo B')
    const [tarjetasRojasA, setTarjetasRojasA]     = useState(0)
    const [tarjetasRojasB, setTarjetasRojasB]     = useState(0)
    const [tarjetasAmarillasA, setTarjetasAmarillasA] = useState(0)
    const [tarjetasAmarillasB, setTarjetasAmarillasB] = useState(0)
    const [faltasA, setFaltasA] = useState(0)
    const [faltasB, setFaltasB] = useState(0)
    const [periodo, setPeriodo]                   = useState('1T')
    const [tiempoMinutos, setTiempoMinutos]       = useState(45)
    const [tiempoActual, setTiempoActual]         = useState(0)
    const [timerActivo, setTimerActivo]           = useState(false)

    useEffect(() => {
        const cargarEstado = async () => {
            const m = await ObtenerMarcador()
            setScoreA(m.golesA)
            setScoreB(m.golesB)
            setNombreA(m.nombreA)
            setNombreB(m.nombreB)
            setNombreATemp(m.nombreA)
            setNombreBTemp(m.nombreB)
            setTarjetasRojasA(m.tarjetasRojasA || 0)
            setTarjetasRojasB(m.tarjetasRojasB || 0)
            setTarjetasAmarillasA(m.tarjetasAmarillasA || 0)
            setTarjetasAmarillasB(m.tarjetasAmarillasB || 0)
            setFaltasA(m.faltasA || 0)
            setFaltasB(m.faltasB || 0)
            setPeriodo(m.periodo || '1T')

            const t = await ObtenerEstadoCronometro()
            setTiempoActual(t.tiempo)
            setTimerActivo(t.activo)
        }
        cargarEstado()

        EventsOn('marcador_actualizado', (d) => {
            setScoreA(d.golesA)
            setScoreB(d.golesB)
            if (d.nombreA) setNombreA(d.nombreA)   // solo el display, no el input
            if (d.nombreB) setNombreB(d.nombreB)   // solo el display, no el input
            setTarjetasRojasA(d.tarjetasRojasA || 0)
            setTarjetasRojasB(d.tarjetasRojasB || 0)
            setTarjetasAmarillasA(d.tarjetasAmarillasA || 0)
            setTarjetasAmarillasB(d.tarjetasAmarillasB || 0)
            setFaltasA(d.faltasA || 0)
            setFaltasB(d.faltasB || 0)

            setPeriodo(d.periodo || '1T')
            if (d.tiempoActual !== undefined) setTiempoActual(d.tiempoActual)
            if (d.timerActivo !== undefined)  setTimerActivo(d.timerActivo)
        })

        EventsOn('timer_actualizado', (d) => {
            setTiempoActual(d.tiempo)
            setTimerActivo(d.activo)
        })

        EventsOn('timer_finalizado', () => {
            setTimerActivo(false)
            alert('⏰ Tiempo terminado!')
        })
    }, [])

    const fmt = (s) => {
        const m = Math.floor(s / 60)
        const ss = s % 60
        return `${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`
    }

    const handlePeriodo = async (p) => {
        await CambiarPeriodo(p)
        setPeriodo(p)
    }

    const handleSwitch = async () => {
        await SwitchEquipos()
    }

    const handleNombreA = async () => {
        await ActualizarNombreEquipoA(nombreATemp)
        setNombreA(nombreATemp)
    }

    const handleNombreB = async () => {
        await ActualizarNombreEquipoB(nombreBTemp)
        setNombreB(nombreBTemp)
    }

    const handleIniciar = async () => {
        await IniciarCronometro(parseInt(tiempoMinutos))
    }

    return (
        <div className="dashboard">

            {/* HEADER */}
            <div className="dashboard-header">
                <div className="header-left">
                    <p className="supra">SISTEMA DE MARCADOR</p>
                    <p className="titulo">PANEL DE CONTROL</p>
                </div>
                <span className="conexion">● CONECTADO</span>
            </div>

            {/* BARRA DE CONTROL */}
            <div className="control-bar">
                <span className="cb-label">PERIODO</span>
                <button
                    className={periodo === '1T' ? 'btn-periodo activo' : 'btn-periodo'}
                    onClick={() => handlePeriodo('1T')}
                >1T</button>
                <button
                    className={periodo === '2T' ? 'btn-periodo activo' : 'btn-periodo'}
                    onClick={() => handlePeriodo('2T')}
                >2T</button>

                <div className="cb-sep" />

                <button className="btn-switch" onClick={handleSwitch}>
                    ⇄ SWITCH
                </button>

                <div className="cb-sep" />

                <button className="btn-reset-sm" onClick={async () => await ResetearMarcador()}>
                    RESET
                </button>

                <div className="cb-sep" />

                <span className="cb-label">TIMER</span>
                <span className="timer-display-bar">{fmt(tiempoActual)}</span>

                <button
                    className="btn-timer-sm"
                    onClick={handleIniciar}
                    disabled={timerActivo}
                >▶</button>
                <button
                    className="btn-timer-sm"
                    onClick={timerActivo ? PausarCronometro : ReanudarCronometro}
                >
                    {timerActivo ? '⏸' : '▶▶'}
                </button>
                <button className="btn-timer-sm" onClick={ResetearCronometro}>↺</button>

                <span className="min-lbl">MIN</span>
                <input
                    className="min-input"
                    type="number"
                    value={tiempoMinutos}
                    onChange={(e) => setTiempoMinutos(e.target.value)}
                    min="1" max="120"
                    disabled={timerActivo}
                />
            </div>

            {/* NOMBRES */}
            <div className="seccion-nombres">
                <div className="nombre-bloque">
                    <label>EQUIPO A</label>
                    <input
                        type="text"
                        value={nombreATemp}
                        onChange={(e) => setNombreATemp(e.target.value)}
                        placeholder="Nombre Equipo A"
                    />
                    <button className="btn-actualizar" onClick={handleNombreA}>
                        ACTUALIZAR
                    </button>
                </div>
                <div className="vs-label">VS</div>
                <div className="nombre-bloque">
                    <label>EQUIPO B</label>
                    <input
                        type="text"
                        value={nombreBTemp}
                        onChange={(e) => setNombreBTemp(e.target.value)}
                        placeholder="Nombre Equipo B"
                    />
                    <button className="btn-actualizar" onClick={handleNombreB}>
                        ACTUALIZAR
                    </button>
                </div>
            </div>

            {/* PANELES EQUIPOS 50/50 */}
            <div className="equipos-grid">

                {/* EQUIPO A */}
                <div className="equipo-panel">
                    <div className="equipo-nombre-label">{nombreA}</div>
                    <div className="score-grande">{scoreA}</div>
                    <div className="gol-btns">
                        <button className="btn-gol plus"
                            onClick={async () => await IncrementarEquipoA()}>
                            + GOL
                        </button>
                        <button className="btn-gol minus"
                            onClick={async () => await DecrementarEquipoA()}>
                            − GOL
                        </button>
                    </div>
                    <div className="tarjetas-inline">
                        <div className="tarjeta-col">
                            <div className="tarjeta-top">
                                <span className="tarjeta-sq roja" />
                                <span className="tarjeta-num">{tarjetasRojasA}</span>
                            </div>
                            <div className="tarjeta-btns">
                                <button className="btn-card add"
                                    onClick={async () => await AgregarTarjetaRojaA()}>+</button>
                                <button className="btn-card rem"
                                    onClick={async () => await QuitarTarjetaRojaA()}>−</button>
                            </div>
                        </div>
                        <div className="tarjeta-col">
                            <div className="tarjeta-top">
                                <span className="tarjeta-sq amarilla" />
                                <span className="tarjeta-num">{tarjetasAmarillasA}</span>
                            </div>
                            <div className="tarjeta-btns">
                                <button className="btn-card add"
                                    onClick={async () => await AgregarTarjetaAmarillaA()}>+</button>
                                <button className="btn-card rem"
                                    onClick={async () => await QuitarTarjetaAmarillaA()}>−</button>
                            </div>
                        </div>
                        <div className="tarjeta-col">
                            <div className="tarjeta-top">
                                <span className="tarjeta-sq falta" />
                                <span className="tarjeta-num">{faltasA}</span>
                            </div>
                            <div className="tarjeta-btns">
                                <button className="btn-card add"
                                    onClick={async () => await AgregarFaltaA()}>+</button>
                                <button className="btn-card rem"
                                    onClick={async () => await QuitarFaltaA()}>−</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EQUIPO B */}
                <div className="equipo-panel">
                    <div className="equipo-nombre-label">{nombreB}</div>
                    <div className="score-grande">{scoreB}</div>
                    <div className="gol-btns">
                        <button className="btn-gol plus"
                            onClick={async () => await IncrementarEquipoB()}>
                            + GOL
                        </button>
                        <button className="btn-gol minus"
                            onClick={async () => await DecrementarEquipoB()}>
                            − GOL
                        </button>
                    </div>
                    <div className="tarjetas-inline">
                        <div className="tarjeta-col">
                            <div className="tarjeta-top">
                                <span className="tarjeta-sq roja" />
                                <span className="tarjeta-num">{tarjetasRojasB}</span>
                            </div>
                            <div className="tarjeta-btns">
                                <button className="btn-card add"
                                    onClick={async () => await AgregarTarjetaRojaB()}>+</button>
                                <button className="btn-card rem"
                                    onClick={async () => await QuitarTarjetaRojaB()}>−</button>
                            </div>
                        </div>
                        <div className="tarjeta-col">
                            <div className="tarjeta-top">
                                <span className="tarjeta-sq amarilla" />
                                <span className="tarjeta-num">{tarjetasAmarillasB}</span>
                            </div>
                            <div className="tarjeta-btns">
                                <button className="btn-card add"
                                    onClick={async () => await AgregarTarjetaAmarillaB()}>+</button>
                                <button className="btn-card rem"
                                    onClick={async () => await QuitarTarjetaAmarillaB()}>−</button>
                            </div>
                        </div>
                        <div className="tarjeta-col">
                            <div className="tarjeta-top">
                                <span className="tarjeta-sq falta" />
                                <span className="tarjeta-num">{faltasB}</span>
                            </div>
                            <div className="tarjeta-btns">
                                <button className="btn-card add"
                                    onClick={async () => await AgregarFaltaB()}>+</button>
                                <button className="btn-card rem"
                                    onClick={async () => await QuitarFaltaB()}>−</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* VISTA PREVIA */}
            <div className="vista-previa">
                <div className="preview-header">VISTA PREVIA</div>
                <div className="preview-score">
                    <div className="prev-equipo">
                        <div className="prev-nombre">{nombreA.toUpperCase()}</div>
                        <div className="prev-num">{scoreA}</div>
                        <div className="prev-cards">
                            {[...Array(tarjetasRojasA)].map((_,i) => <div key={i} className="prev-card r"/>)}
                            {[...Array(tarjetasAmarillasA)].map((_,i) => <div key={i} className="prev-card y"/>)}
                        </div>
                    </div>
                    <div className="prev-sep">:</div>
                    <div className="prev-equipo">
                        <div className="prev-nombre">{nombreB.toUpperCase()}</div>
                        <div className="prev-num">{scoreB}</div>
                        <div className="prev-cards">
                            {[...Array(tarjetasRojasB)].map((_,i) => <div key={i} className="prev-card r"/>)}
                            {[...Array(tarjetasAmarillasB)].map((_,i) => <div key={i} className="prev-card y"/>)}
                        </div>
                    </div>
                </div>
                <div className="prev-periodo">{periodo}</div>
                {tiempoActual > 0 && <div className="prev-tiempo">{fmt(tiempoActual)}</div>}
            </div>

            {/* BOTTOM */}
            <div className="bottom-bar">
                <span className="bot-on">● COREGOL-OPERATOR</span>
                <span className="bot-txt">SESSION: {nombreA} VS {nombreB}</span>
            </div>

        </div>
    )
}

export default Dashboard