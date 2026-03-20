import { useState, useEffect } from 'react'
import { EventsOn } from '../../wailsjs/runtime/runtime'
import { ObtenerMarcador, ObtenerEstadoCronometro } from '../../wailsjs/go/main/App'
import './Presentacion.css'

function Presentacion() {
    const [scoreA, setScoreA] = useState(0)
    const [scoreB, setScoreB] = useState(0)
    const [nombreA, setNombreA] = useState('Equipo A')
    const [nombreB, setNombreB] = useState('Equipo B')
    const [tiempoActual, setTiempoActual] = useState(0)

    useEffect(() => {
        const cargarEstado = async () => {
            const marcador = await ObtenerMarcador()
            setScoreA(marcador.equipoA)
            setScoreB(marcador.equipoB)
            setNombreA(marcador.nombreA)
            setNombreB(marcador.nombreB)

            const timer = await ObtenerEstadoCronometro()
            setTiempoActual(timer.tiempo)
        }
        cargarEstado()

        EventsOn("marcador_actualizado", (data) => {
            setScoreA(data.equipoA)
            setScoreB(data.equipoB)
            if (data.nombreA) setNombreA(data.nombreA)
            if (data.nombreB) setNombreB(data.nombreB)
        })

        EventsOn("timer_actualizado", (data) => {
            setTiempoActual(data.tiempo)
        })
    }, [])

    const formatearTiempo = (segundos) => {
        const mins = Math.floor(segundos / 60)
        const secs = segundos % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="presentacion-fullscreen">
            {tiempoActual > 0 && (
                <div className="timer-presentacion">
                    {formatearTiempo(tiempoActual)}
                </div>
            )}
            
            <div className="equipo-presentacion equipo-a">
                <h1 className="nombre-equipo">{nombreA}</h1>
                <div className="score-gigante">{scoreA}</div>
            </div>
            
            <div className="separador-central">-</div>

            <div className="equipo-presentacion equipo-b">
                <h1 className="nombre-equipo">{nombreB}</h1>
                <div className="score-gigante">{scoreB}</div>
            </div>
        </div>
    )
}

export default Presentacion