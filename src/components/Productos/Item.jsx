import Styles from '../../css/TarjetaProducto.module.css'
// import { useEffect, useState } from 'react'
import { useState } from 'react';
import { useFavoritos } from '../../utils/useFavoritos.js';
import { Link } from 'react-router-dom'
import { useCart } from '../Cart/UseCart'

const STOCK_BAJO = 5

/* Iconos SVG inline: sin dependencias externas */
function Icono({ children, fill = 'none', size = 18 }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={fill}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {children}
        </svg>
    )
}

const IconoCorazon = ({ lleno }) => (
    <Icono fill={lleno ? 'currentColor' : 'none'}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </Icono>
)

const IconoBolsa = () => (
    <Icono size={16}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </Icono>
)

const IconoMenos = () => (
    <Icono size={16}><path d="M5 12h14" /></Icono>
)

const IconoMas = () => (
    <Icono size={16}><path d="M5 12h14" /><path d="M12 5v14" /></Icono>
)


export default function Item({
    id,
    imagen,
    nombre,
    precio,
    tipo,
    descripcion,
    stock,
    etiqueta,
    presentacion,
}) {

console.log('ID recibido por Item:', id, nombre);

    const producto = { id, nombre, precio, stock, imagen }; //creado nuevo

    const [cantidad, setCantidad] = useState(1);

    const { esFavorito, alternarFavorito } = useFavoritos();
    const favorito = esFavorito(id);

    console.log({
    nombre,
    id,
    favorito,
});

    const agotado = stock === 0
    const stockBajo = stock > 0 && stock <= STOCK_BAJO

    const incrementar = () => setCantidad((c) => Math.min(c + 1, stock))
    const decrementar = () => setCantidad((c) => Math.max(c - 1, 1))


    // const agregarAlCarrito = () => {
    //     alert(`Agregaste ${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'} de ${nombre}`)
    // }

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (agotado || cantidad < 1) return;

        addToCart(producto, cantidad);

        alert(
            `Agregaste ${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'
            } de ${nombre} al carrito.`
        );
    };

    const claseTarjeta = [Styles.tarjeta, agotado && Styles.agotada].filter(Boolean).join(' ')

    

    return (
        <article className={claseTarjeta}>

            {/* Imagen con etiquetas superpuestas */}
            <div className={Styles.media}>
                <img className={Styles.imagen} src={imagen} alt={nombre} loading="lazy" />

                {/* El aviso de stock solo aparece cuando importa */}
                {agotado && <span className={`${Styles.aviso} ${Styles.avisoAgotado}`}>Agotado</span>}
                {stockBajo && (
                    <span className={`${Styles.aviso} ${Styles.avisoBajo}`}>
                        Últimas {stock} unidades
                    </span>
                )}

                {etiqueta && <span className={Styles.etiqueta}>{etiqueta}</span>}

                <button
                    type="button"
                    className={Styles.favorito}
                    onClick={() => alternarFavorito(id)}
                    aria-pressed={favorito}
                    aria-label={
                        favorito
                            ? `Quitar ${nombre} de favoritos`
                            : `Agregar ${nombre} a favoritos`
                    }
                >
                    <IconoCorazon lleno={favorito} />
                </button>
            </div>

            <div className={Styles.contenido}>

                <p className={Styles.tipo}>{tipo}</p>
                <h3 className={Styles.nombre}>{nombre}</h3>
                <p className={Styles.descripcion}>{descripcion}</p>

                <div className={Styles.filaPrecio}>
                    <p className={Styles.precio}>
                        ARS ${precio.toLocaleString('es-AR', { maximumFractionDigits: 2 })}
                    </p>
                    {presentacion && <p className={Styles.presentacion}>{presentacion}</p>}
                </div>

                <div className={Styles.cantidadFila}>
                    <span className={Styles.cantidadLabel}>Cantidad</span>

                    <div className={Styles.contador} role="group" aria-label={`Cantidad de ${nombre}`}>
                        <button
                            type="button"
                            className={Styles.button}
                            onClick={decrementar}
                            disabled={agotado || cantidad <= 1}
                            aria-label="Quitar una unidad"
                        >
                            <IconoMenos />
                        </button>
                        <span className={Styles.cantidad} aria-live="polite">{cantidad}</span>
                        <button
                            type="button"
                            className={Styles.button}
                            onClick={incrementar}
                            disabled={agotado || cantidad >= stock}
                            aria-label="Agregar una unidad"
                        >
                            <IconoMas />
                        </button>
                    </div>
                </div>

                <div className={Styles.acciones}>
                    <Link
                        to={`/producto/${id}`}
                        className={Styles.verDetalle}
                        aria-label={`Ver detalle de ${nombre}`}
                    >
                        Ver detalle
                    </Link>

                    <button
                        type="button"
                        className={Styles.botonCarrito}
                        onClick={handleAddToCart}
                        disabled={agotado}
                        aria-label={agotado ? `${nombre} sin stock` : `Agregar ${nombre} al carrito`}
                    >
                        <IconoBolsa />
                        {agotado ? 'Sin stock' : 'Agregar'}
                    </button>
                </div>

            </div>
        </article>
    )
}