import Styles from '../css/TarjetaProducto.module.css'
import { useState } from 'react'

const STOCK_BAJO = 5

export default function Item({ imagen, nombre, precio, tipo, descripcion, stock }) {

    const [cantidad, setCantidad] = useState(1)
    const [esFavorito, setEsFavorito] = useState(false)

    const agotado = stock === 0
    const stockBajo = stock > 0 && stock <= STOCK_BAJO

    const incrementar = () => setCantidad((c) => Math.min(c + 1, stock))
    const decrementar = () => setCantidad((c) => Math.max(c - 1, 1))

    const agregarAlCarrito = () => {
        alert(`Agregaste ${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'} de ${nombre}`)
    }

    const alternarFavorito = () => setEsFavorito((f) => !f)

    const claseStock = [
        Styles.stock,
        stockBajo && Styles.stockBajo,
        agotado && Styles.stockAgotado,
    ].filter(Boolean).join(' ')

    const textoStock = agotado
        ? 'Agotado'
        : stockBajo
            ? `Últimas ${stock} unidades`
            : `Stock: ${stock}`

    return (
        <article className={Styles.tarjeta}>

            <img className={Styles.imagen} src={imagen} alt={nombre} loading="lazy" />

            <div className={Styles.contenido}>

                <p className={Styles.tipo}>{tipo}</p>

                <div className={Styles.cardTittle}>
                    <h3 className={Styles.nombre}>{nombre}</h3>
                    <button
                        type="button"
                        className={Styles.favorito}
                        onClick={alternarFavorito}
                        aria-pressed={esFavorito}
                        aria-label={esFavorito ? `Quitar ${nombre} de favoritos` : `Agregar ${nombre} a favoritos`}
                    >
                        {esFavorito ? '♥' : '♡'}
                    </button>
                </div>

                <p className={Styles.descripcion}>{descripcion}</p>
                <p className={claseStock}>{textoStock}</p>

                <p className={Styles.precio}>
                    ${precio.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </p>

                <div className={Styles.contador}>
                    <button
                        type="button"
                        className={Styles.button}
                        onClick={decrementar}
                        disabled={agotado || cantidad <= 1}
                        aria-label="Quitar una unidad"
                    >
                        −
                    </button>
                    <p className={Styles.cantidad} aria-live="polite">{cantidad}</p>
                    <button
                        type="button"
                        className={Styles.button}
                        onClick={incrementar}
                        disabled={agotado || cantidad >= stock}
                        aria-label="Agregar una unidad"
                    >
                        +
                    </button>
                </div>

                <button type="button" className={Styles.boton}>Ver producto</button>
                <button
                    type="button"
                    className={Styles.botonCarrito}
                    onClick={agregarAlCarrito}
                    disabled={agotado}
                >
                    {agotado ? 'Sin stock' : 'Agregar al carrito'}
                </button>

            </div>
        </article>
    )
}