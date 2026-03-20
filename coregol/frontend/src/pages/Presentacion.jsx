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
    const [tarjetasRojasA, setTarjetasRojasA] = useState(0)
    const [tarjetasRojasB, setTarjetasRojasB] = useState(0)
    const [tarjetasAmarillasA, setTarjetasAmarillasA] = useState(0)
    const [tarjetasAmarillasB, setTarjetasAmarillasB] = useState(0)
    const [periodo, setPeriodo] = useState('1T')

    useEffect(() => {
        const cargarEstado = async () => {
            const marcador = await ObtenerMarcador()
            setScoreA(marcador.equipoA)
            setScoreB(marcador.equipoB)
            setNombreA(marcador.nombreA)
            setNombreB(marcador.nombreB)
            setTarjetasRojasA(marcador.tarjetasRojasA || 0)
            setTarjetasRojasB(marcador.tarjetasRojasB || 0)
            setTarjetasAmarillasA(marcador.tarjetasAmarillasA || 0)
            setTarjetasAmarillasB(marcador.tarjetasAmarillasB || 0)
            setPeriodo(marcador.periodo || '1T')

            const timer = await ObtenerEstadoCronometro()
            setTiempoActual(timer.tiempo)
        }
        cargarEstado()

        EventsOn("marcador_actualizado", (data) => {
            setScoreA(data.equipoA)
            setScoreB(data.equipoB)
            if (data.nombreA) setNombreA(data.nombreA)
            if (data.nombreB) setNombreB(data.nombreB)
            setTarjetasRojasA(data.tarjetasRojasA || 0)
            setTarjetasRojasB(data.tarjetasRojasB || 0)
            setTarjetasAmarillasA(data.tarjetasAmarillasA || 0)
            setTarjetasAmarillasB(data.tarjetasAmarillasB || 0)
            setPeriodo(data.periodo || '1T')
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

    const renderTarjetas = (rojas, amarillas) => {
        const tarjetas = []
        
        // Tarjetas amarillas
        for (let i = 0; i < amarillas; i++) {
            tarjetas.push(<div key={`amarilla-${i}`} className="tarjeta tarjeta-amarilla"></div>)
        }
        
        // Tarjetas rojas
        for (let i = 0; i < rojas; i++) {
            tarjetas.push(<div key={`roja-${i}`} className="tarjeta tarjeta-roja"></div>)
        }
        
        return tarjetas
    }

    return (
        <div className="presentacion-fullscreen">
            {tiempoActual > 0 && (
                <div className="timer-presentacion">
                    <div className="periodo-badge">{periodo}</div>
                    {formatearTiempo(tiempoActual)}
                </div>
            )}
            
            <div className="equipo-presentacion equipo-a">
                <h1 className="nombre-equipo">{nombreA}</h1>
                
                <div className="tarjetas-container">
                    {renderTarjetas(tarjetasRojasA, tarjetasAmarillasA)}
                </div>
                
                <div className="score-gigante">{scoreA}</div>
            </div>
            
            <div className="separador-central">-</div>

            <div className="equipo-presentacion equipo-b">
                <h1 className="nombre-equipo">{nombreB}</h1>
                
                <div className="tarjetas-container">
                    {renderTarjetas(tarjetasRojasB, tarjetasAmarillasB)}
                </div>
                
                <div className="score-gigante">{scoreB}</div>
            </div>
        </div>
    )
}

export default Presentacion