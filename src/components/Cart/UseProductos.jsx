
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config' // Verificá esta ruta según tu proyecto

export default function useProductos() {
    const [estado, setEstado] = useState({
        cargando: true,
        error: false,
        productos: [],
    })

    useEffect(() => {
        let activo = true

        const cargarProductos = async () => {
            try {
                const referenciaProductos = collection(db, 'productos')
                const resultado = await getDocs(referenciaProductos)

                const productos = resultado.docs.map((documento) => ({
                    ...documento.data(),
                    firestoreId: documento.id,
                }))

                if (activo) {
                    setEstado({
                        cargando: false,
                        error: false,
                        productos,
                    })
                }
            } catch (error) {
                console.error('Error al cargar productos desde Firestore:', error)

                if (activo) {
                    setEstado({
                        cargando: false,
                        error: true,
                        productos: [],
                    })
                }
            }
        }

        cargarProductos()

        return () => {
            activo = false
        }
    }, [])

    return estado
}
