import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // O la librería de rutas que uses
import ItemList from './ItemList';
import Styles from '../../css/ProductosDestacados.module.css';

export default function ProductosDestacados() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/productos.json')
            .then((res) => res.json())
            .then((datos) => {
                // Tomamos solo 3 cafés para que entren perfectamente en una sola línea horizontal
                setProductos(datos.slice(0, 3)); 
            })
            .catch((err) => console.error("Error cargando destacados:", err))
            .finally(() => setCargando(false));
    }, []);

    if (cargando) return <p style={{ textAlign: 'center' }}>Cargando selección...</p>;

    return (
        <div className={Styles.destacadosContenedor}>
            {/* Renderiza directamente las tarjetas usando tu componente ItemList */}
            <ItemList productos={productos} />
            
            {/* Botón de acción hacia el catálogo completo */}
            <div className={Styles.accionCatalogo}>
                <Link to="/productos" className="hero-button">
                    Ver todos los cafés
                </Link>
            </div>
        </div>
    );
}