import { useEffect, useState } from 'react';
import { FavoritosContext } from './FavoritosContext';

const CLAVE_FAVORITOS = 'bruma-favoritos';

function obtenerFavoritosIniciales() {
    try {
        const guardados = localStorage.getItem(CLAVE_FAVORITOS);
        const datos = guardados ? JSON.parse(guardados) : [];

        return Array.isArray(datos) ? datos : [];
    } catch {
        return [];
    }
}

export function FavoritosProvider({ children }) {
    const [favoritos, setFavoritos] = useState(
        obtenerFavoritosIniciales
    );

    useEffect(() => {
        localStorage.setItem(
            CLAVE_FAVORITOS,
            JSON.stringify(favoritos)
        );
    }, [favoritos]);

const alternarFavorito = (id) => {
    if (id === undefined || id === null) {
        console.error('No se puede guardar un favorito sin ID válido.');
        return;
    }

    const idNormalizado = String(id);

    setFavoritos((actuales) =>
        actuales.some((favoritoId) => String(favoritoId) === idNormalizado)
            ? actuales.filter(
                (favoritoId) => String(favoritoId) !== idNormalizado
            )
            : [...actuales, idNormalizado]
    );
};

const esFavorito = (id) =>
    id !== undefined &&
    id !== null &&
    favoritos.some((favoritoId) => String(favoritoId) === String(id));

    const borrarFavoritos = () => {
    setFavoritos([]);
};

    return (
        <FavoritosContext.Provider
            value={{
                favoritos,
                cantidadFavoritos: favoritos.length,
                alternarFavorito,
                esFavorito,
                borrarFavoritos,
            }}
        >
            {children}
        </FavoritosContext.Provider>
    );
}