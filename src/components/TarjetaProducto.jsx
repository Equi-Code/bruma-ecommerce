import Styles from '../css/TarjetaProducto.module.css';

export default function TarjetaProducto({ imagen, nombre, precio, tipo, descripcion, stock }) {
    return (
        <article className={Styles.tarjeta}>
            
            <img className={Styles.imagen} src={imagen} alt={nombre} />

        
        <div className={Styles.contenido}>   

            <p className={Styles.tipo}>{tipo}</p>
            <h3 className={Styles.nombre}>{nombre}</h3>
            <p className={Styles.descripcion}>{descripcion}</p>
            <p className={Styles.stock}>Stock: {stock}</p>
            <p className={Styles.precio}>${precio.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>


            <button className={Styles.boton}>Ver producto</button>

        </div>
        
        </article>

    );
}