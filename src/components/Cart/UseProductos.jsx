import { useEffect, useState } from 'react'

/**
 * Carga /data/productos.json una vez.
 * Devuelve { cargando, error, productos }.
 * Puedes usarlo también en ProductoDetalle, Home, etc. en lugar de repetir el fetch.
 */
export default function useProductos() {
    const [estado, setEstado] = useState({ cargando: true, error: false, productos: [] })

    useEffect(() => {
        const controlador = new AbortController()

        fetch('/data/productos.json', { signal: controlador.signal })
            .then((respuesta) => {
                if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
                return respuesta.json()
            })
            .then((productos) => setEstado({ cargando: false, error: false, productos }))
            .catch((error) => {
                if (error.name === 'AbortError') return
                console.error('Error al cargar los productos:', error)
                setEstado({ cargando: false, error: true, productos: [] })
            })

        return () => controlador.abort()
    }, [])

    return estado
}