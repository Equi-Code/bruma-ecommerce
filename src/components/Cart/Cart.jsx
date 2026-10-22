import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from './UseCart'
import useProductos from './UseProductos'
import Styles from '../../css/Cart.module.css';


/* =========================
   Configuración (edita a gusto)
   ========================= */

// ⚠️ Valores de ejemplo: confirma que coincidan con las condiciones reales de tu tienda
const ENVIO_GRATIS_DESDE = 20000
const IVA = 1.21
const CUPONES = { CATADOR: 10 } // código → % de descuento. Bórralo o cámbialo.

const VENTAJAS_PAGO = [
    { icono: 'tarjeta', texto: 'Hasta 6 cuotas sin interés con bancos adheridos.' },
    { icono: 'porcentaje', texto: '10% OFF extra abonando con transferencia directa.' },
    { icono: 'candado', texto: 'Proceso encriptado con protocolo SSL de 256 bits.' },
]

const GARANTIAS = [
    { icono: 'hoja', titulo: 'Origen 100% trazable', texto: 'Trato directo con pequeños productores.' },
    { icono: 'tueste', titulo: 'Tueste bajo demanda', texto: 'Despachamos café recién tostado para conservar sus notas.' },
    { icono: 'paquete', titulo: 'Empaque con válvula', texto: 'Bolsas que desgasifican y protegen los aromas.' },
    { icono: 'escudo', titulo: 'Garantía sensorial', texto: 'Si el perfil no se ajusta a tu método, lo resolvemos.' },
]

const formatearPrecio = (n) =>
    `ARS $${Number(n).toLocaleString('es-AR', { maximumFractionDigits: 0 })}`

/* =========================
   Iconos SVG inline (sin dependencias)
   ========================= */

function Icono({ children, size = 18, grosor = 1.6 }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth={grosor}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {children}
        </svg>
    )
}

const ICONOS = {
    envio: (
        <Icono>
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
        </Icono>
    ),
    tarjeta: (
        <Icono size={16}>
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
        </Icono>
    ),
    porcentaje: (
        <Icono size={16}>
            <line x1="19" x2="5" y1="5" y2="19" />
            <circle cx="6.5" cy="6.5" r="2.5" />
            <circle cx="17.5" cy="17.5" r="2.5" />
        </Icono>
    ),
    candado: (
        <Icono size={16}>
            <rect width="18" height="11" x="3" y="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </Icono>
    ),
    hoja: (
        <Icono size={26} grosor={1.4}>
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </Icono>
    ),
    tueste: (
        <Icono size={26} grosor={1.4}>
            <ellipse cx="12" cy="12" rx="6" ry="9" transform="rotate(40 12 12)" />
            <path d="M8.5 15.5c2.5-1 4.5-3 6-6.5" />
        </Icono>
    ),
    paquete: (
        <Icono size={26} grosor={1.4}>
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </Icono>
    ),
    escudo: (
        <Icono size={26} grosor={1.4}>
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="m9 12 2 2 4-4" />
        </Icono>
    ),
    quitar: (
        <Icono size={12} grosor={2}>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </Icono>
    ),
    menos: <Icono size={14}><path d="M5 12h14" /></Icono>,
    mas: <Icono size={14}><path d="M5 12h14" /><path d="M12 5v14" /></Icono>,
    flechaDer: <Icono size={16}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Icono>,
    flechaIzq: <Icono size={16}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></Icono>,
    regalo: (
        <Icono size={16}>
            <rect x="3" y="8" width="18" height="4" rx="1" />
            <path d="M12 8v13" />
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
        </Icono>
    ),
    bolsa: (
        <Icono size={40} grosor={1.1}>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </Icono>
    ),
}

/* =========================
   Carrito
   ========================= */

export default function Cart() {
    // removeFromCart, updateQuantity y addToCart son opcionales: si tu hook aún no
    // los tiene, los controles correspondientes simplemente no se muestran.
    const { cart, clearCart, getCartTotal, updateQuantity, addToCart, removeItem } = useCart()
    const { productos } = useProductos()

    const [codigo, setCodigo] = useState('')
    const [cupon, setCupon] = useState(null) // { codigo, porcentaje }
    const [estadoCupon, setEstadoCupon] = useState(null) // { tipo: 'ok' | 'error', texto }

    /* ---------- Carrito vacío ---------- */
    if (cart.length === 0) {
        return (
            <main className={Styles.vacio}>
                <span className={Styles.vacioIcono}>{ICONOS.bolsa}</span>
                <h1 className={Styles.vacioTitulo}>Tu bolsa está vacía</h1>
                <p className={Styles.vacioTexto}>Agregá productos para continuar con tu compra.</p>
                <Link to="/productos" className={Styles.botonPagar}>
                    Explorar cafés
                    {ICONOS.flechaDer}
                </Link>
            </main>
        )
    }

    /* ---------- Cálculos ---------- */
    const subtotal = Number(getCartTotal())
    const unidades = cart.reduce((acc, item) => acc + item.quantity, 0)
    const descuento = cupon ? Math.round((subtotal * cupon.porcentaje) / 100) : 0
    const total = subtotal - descuento
    const iva = total - total / IVA // los precios ya incluyen IVA

    const faltaParaEnvio = Math.max(ENVIO_GRATIS_DESDE - total, 0)
    const envioGratis = faltaParaEnvio === 0
    const progreso = Math.min(100, Math.round((total / ENVIO_GRATIS_DESDE) * 100))

    const complementos = productos
        .filter((p) => p.stock !== 0 && !cart.some((item) => item.id === p.id))
        .slice(0, 3)

    /* ---------- Acciones ---------- */
    const aplicarCupon = (e) => {
        e.preventDefault()
        const clave = codigo.trim().toUpperCase()
        if (!clave) return

        const porcentaje = CUPONES[clave]
        if (porcentaje) {
            setCupon({ codigo: clave, porcentaje })
            setEstadoCupon({ tipo: 'ok', texto: `Cupón ${clave} aplicado: ${porcentaje}% de descuento.` })
        } else {
            setCupon(null)
            setEstadoCupon({ tipo: 'error', texto: 'El código no es válido.' })
        }
    }

    const vaciarCarrito = () => {
        if (window.confirm('¿Querés vaciar tu bolsa?')) clearCart()
    }

    const iniciarCompra = () => {
        // TODO: reemplazar por la navegación al checkout o la pasarela de pago
        alert('Próximamente: pasarela de pago.')
    }

    return (
        <main className={Styles.pagina}>

            {/* ============ Encabezado ============ */}
            <nav className={Styles.migas} aria-label="Ruta de navegación">
                <ol>
                    <li><Link to="/">Inicio</Link></li>
                    <li aria-current="page">Carrito de compras</li>
                </ol>
            </nav>

            <header className={Styles.encabezado}>
                <div>
                    <h1 className={Styles.titulo}>Tu bolsa de café</h1>
                    <p className={Styles.subtitulo}>
                        {cart.length} {cart.length === 1 ? 'variedad seleccionada' : 'variedades seleccionadas'} para tu ritual matutino
                    </p>
                </div>
                <p className={Styles.chipTostaduria}>Tostaduría activa · Buenos Aires</p>
            </header>

            {/* ============ Barra de envío gratis ============ */}
            <div className={Styles.envio} role="status">
                <p className={Styles.envioTexto}>
                    {ICONOS.envio}
                    {envioGratis ? (
                        <span>
                            ¡Felicitaciones! Calificaste para el <strong>envío sin cargo</strong> a todo el país.
                        </span>
                    ) : (
                        <span>
                            Sumá <strong>{formatearPrecio(faltaParaEnvio)}</strong> más para obtener <strong>envío sin cargo</strong>.
                        </span>
                    )}
                </p>
                <p className={Styles.envioPorcentaje}>{progreso}% alcanzado</p>
                <div className={Styles.progreso} aria-hidden="true">
                    <div className={Styles.progresoRelleno} style={{ width: `${progreso}%` }} />
                </div>
            </div>

            <div className={Styles.contenido}>

                {/* ============ Productos ============ */}
                <section aria-label="Productos en tu bolsa">
                    <div className={Styles.tablaCaja}>
                        <table className={Styles.tabla}>
                            <caption className={Styles.soloLectores}>Productos en tu bolsa</caption>
                            <thead>
                                <tr>
                                    <th scope="col">Producto &amp; especificación</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id} className={Styles.fila}>

                                        <td className={Styles.celdaProducto}>
                                            {item.imagen && (
                                                <img className={Styles.miniatura} src={item.imagen} alt="" loading="lazy" />
                                            )}
                                            <div className={Styles.productoInfo}>
                                                {item.tipo && <p className={Styles.productoTipo}>{item.tipo}</p>}
                                                <p className={Styles.productoNombre}>
                                                    <Link to={`/productos/${item.id}`}>{item.nombre}</Link>
                                                </p>
                                                {item.presentacion && (
                                                    <p className={Styles.productoSpec}>Presentación: <strong>{item.presentacion}</strong></p>
                                                )}
                                                {item.molienda && (
                                                    <p className={Styles.productoSpec}>Molienda: <strong>{item.molienda}</strong></p>
                                                )}
                                                <div className={Styles.productoAcciones}>
                                                    {item.lote && <span className={Styles.loteChip}>{item.lote}</span>}

                                                        <button
                                                            type="button"
                                                            className={Styles.botonQuitar}
                                                            onClick={() => removeItem(item.id)}
                                                            aria-label={`Quitar ${item.nombre} de la bolsa`}
                                                        >
                                                            {ICONOS.quitar}
                                                            Quitar
                                                        </button>
                                                
                                                </div>
                                            </div>
                                        </td>

                                        <td className={Styles.celdaPrecio} data-label="Precio">
                                            {formatearPrecio(item.precio)}
                                        </td>

                                        <td className={Styles.celdaCantidad} data-label="Cantidad">
                                            {updateQuantity ? (
                                                <div className={Styles.contador} role="group" aria-label={`Cantidad de ${item.nombre}`}>
                                                    <button
                                                        type="button"
                                                        className={Styles.botonContador}
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        aria-label="Quitar una unidad"
                                                    >
                                                        {ICONOS.menos}
                                                    </button>
                                                    <span className={Styles.cantidad} aria-live="polite">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        className={Styles.botonContador}
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        disabled={item.stock != null && item.quantity >= item.stock}
                                                        aria-label="Agregar una unidad"
                                                    >
                                                        {ICONOS.mas}
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className={Styles.cantidad}>{item.quantity}</span>
                                            )}
                                        </td>

                                        <td className={Styles.celdaSubtotal} data-label="Subtotal">
                                            {formatearPrecio(item.precio * item.quantity)}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={Styles.pie}>
                        <Link to="/productos" className={Styles.enlaceSuave}>
                            {ICONOS.flechaIzq}
                            Continuar explorando orígenes
                        </Link>

                        <button type="button" className={Styles.enlaceSuave} onClick={vaciarCarrito}>
                            Vaciar bolsa
                        </button>

                        <Link to="/contacto" className={Styles.enlaceSuave}>
                            {ICONOS.regalo}
                            ¿Es para regalo o molienda especial?
                        </Link>
                    </div>

                </section>

                {/* ============ Resumen ============ */}
                <aside className={Styles.resumen} aria-labelledby="resumen-titulo">
                    <h2 id="resumen-titulo" className={Styles.resumenTitulo}>Resumen de compra</h2>

                    <dl className={Styles.lista}>
                        <div className={Styles.filaResumen}>
                            <dt>Subtotal ({unidades} u.)</dt>
                            <dd>{formatearPrecio(subtotal)}</dd>
                        </div>

                        {cupon && (
                            <div className={`${Styles.filaResumen} ${Styles.filaDescuento}`}>
                                <dt>Cupón {cupon.codigo} (−{cupon.porcentaje}%)</dt>
                                <dd>−{formatearPrecio(descuento)}</dd>
                            </div>
                        )}

                        <div className={Styles.filaResumen}>
                            <dt>
                                Envío a domicilio
                                {envioGratis && <span className={Styles.notaResumen}>Promoción envío gratis</span>}
                            </dt>
                            <dd className={envioGratis ? Styles.sinCargo : undefined}>
                                {envioGratis ? 'Sin cargo' : 'A calcular'}
                            </dd>
                        </div>

                        <div className={Styles.filaResumen}>
                            <dt>Impuestos (IVA 21% incl.)</dt>
                            <dd>{formatearPrecio(iva)}</dd>
                        </div>
                    </dl>

                    <form className={Styles.cupon} onSubmit={aplicarCupon}>
                        <label className={Styles.cuponLabel} htmlFor="cupon">
                            Cupón de descuento o membresía
                        </label>
                        <div className={Styles.cuponFila}>
                            <input
                                id="cupon"
                                className={Styles.cuponInput}
                                type="text"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                placeholder="Código catador"
                                autoComplete="off"
                            />
                            <button type="submit" className={Styles.botonAplicar}>Aplicar</button>
                        </div>
                        {estadoCupon && (
                            <p
                                className={estadoCupon.tipo === 'ok' ? Styles.cuponOk : Styles.cuponError}
                                role="status"
                            >
                                {estadoCupon.texto}
                            </p>
                        )}
                    </form>

                    <div className={Styles.total}>
                        <span className={Styles.totalEtiqueta}>Total</span>
                        <span className={Styles.totalMonto}>{formatearPrecio(total)}</span>
                    </div>
                    <p className={Styles.totalNota}>Moneda de facturación local</p>

                    <button type="button" className={Styles.botonPagar} onClick={iniciarCompra}>
                        Iniciar compra / pagar
                        {ICONOS.flechaDer}
                    </button>

                    <ul className={Styles.ventajas}>
                        {VENTAJAS_PAGO.map(({ icono, texto }) => (
                            <li key={icono} className={Styles.ventaja}>
                                {ICONOS[icono]}
                                {texto}
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>

            {/* ============ Completá tu ritual ============ */}
            {complementos.length > 0 && (
                <section className={Styles.complementos} aria-labelledby="complementos-titulo">
                    <header className={Styles.complementosEncabezado}>
                        <div>
                            <span className={Styles.etiquetaSeccion}>Herramientas y accesorios</span>
                            <h2 id="complementos-titulo" className={Styles.tituloSeccion}>Completá tu ritual</h2>
                        </div>
                        <p className={Styles.complementosTexto}>
                            Piezas y productos seleccionados por nuestro equipo para una extracción perfecta.
                        </p>
                    </header>

                    <div className={Styles.complementosGrid}>
                        {complementos.map((p) => (
                            <article key={p.id} className={Styles.complemento}>
                                <div className={Styles.complementoMedia}>
                                    <img src={p.imagen} alt="" loading="lazy" />
                                    {p.insignia && <span className={Styles.insignia}>{p.insignia}</span>}
                                </div>

                                <div className={Styles.complementoCuerpo}>
                                    {p.tipo && <p className={Styles.productoTipo}>{p.tipo}</p>}
                                    <h3 className={Styles.complementoNombre}>{p.nombre}</h3>
                                    <p className={Styles.complementoDescripcion}>{p.descripcion}</p>

                                    <div className={Styles.complementoPie}>
                                        <p className={Styles.complementoPrecio}>{formatearPrecio(p.precio)}</p>
                                        {addToCart ? (
                                            <button
                                                type="button"
                                                className={Styles.botonAgregar}
                                                onClick={() => addToCart(p)}
                                                aria-label={`Agregar ${p.nombre} a la bolsa`}
                                            >
                                                Agregar +
                                            </button>
                                        ) : (
                                            <Link to={`/productos/${p.id}`} className={Styles.botonAgregar}>
                                                Ver detalle
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* ============ Garantías ============ */}
            <ul className={Styles.garantias}>
                {GARANTIAS.map(({ icono, titulo, texto }) => (
                    <li key={titulo} className={Styles.garantia}>
                        <span className={Styles.garantiaIcono}>{ICONOS[icono]}</span>
                        <div>
                            <p className={Styles.garantiaTitulo}>{titulo}</p>
                            <p className={Styles.garantiaTexto}>{texto}</p>
                        </div>
                    </li>
                ))}
            </ul>

        </main>
    )
}



