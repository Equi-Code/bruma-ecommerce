
import { useState, useEffect } from 'react';
import EquipoList from './EquipoList';


export default function EquipoListContainer() {

    const [equipo, setEquipo] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
   
   
    useEffect(() => {
        fetch('/data/equipo.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de los equipo');
                }
                return respuesta.json();
            })
            .then((datos) => {
                setEquipo(datos);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <p>Cargando equipo, por favor espere...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (

        <>



            <EquipoList equipo={equipo} />

        </>

    );
}