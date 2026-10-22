import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Styles from '../../css/ProductoDetalle.module.css'
import Item from './Item.jsx'
import { useCart } from '../Cart/UseCart'


const STOCK_BAJO = 5

// Textos fijos de confianza: edítalos a gusto
const GARANTIAS = [
    { icono: 'envio', texto: 'Envíos a todo el país en 24-48 h hábiles.' },
    { icono: 'tueste', texto: 'Tostado artesanal bajo demanda, con fecha estampada en la bolsa.' },
    { icono: 'escudo', texto: 'Compra protegida y pagos seguros con todos los medios.' },
]

const ETIQUETAS_FICHA = [
    ['origen', 'Origen'],
    ['variedad', 'Variedad'],
    ['proceso', 'Proceso'],
    ['altitud', 'Altitud'],
    ['tueste', 'Tueste'],
]

const ETIQUETAS_PERFIL = [
    ['acidez', 'Acidez'],
    ['cuerpo', 'Cuerpo'],
    ['dulzura', 'Dulzura'],
]

const formatearPrecio = (n) =>
    `ARS $${Number(n).toLocaleString('es-AR', { maximumFractionDigits: 2 })}`

/* =========================
   Iconos SVG inline (sin dependencias)
   ========================= */

function Icono({ children, size = 20, grosor = 1.6 }) {
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
    tueste: (
        <Icono>
            <ellipse cx="12" cy="12" rx="6" ry="9" transform="rotate(40 12 12)" />
            <path d="M8.5 15.5c2.5-1 4.5-3 6-6.5" />
        </Icono>
    ),
    escudo: (
        <Icono>
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="m9 12 2 2 4-4" />
        </Icono>
    ),
    bolsa: (
        <Icono size={18}>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </Icono>
    ),
    menos: (
        <Icono size={16}><path d="M5 12h14" /></Icono>
    ),
    mas: (
        <Icono size={16}><path d="M5 12h14" /><path d="M12 5v14" /></Icono>
    ),
}

/* =========================
   Grupo de opciones (radios accesibles con aspecto de tarjeta o de chip)
   ========================= */

function GrupoOpciones({ legend, name, opciones, valor, onChange, variante = 'tarjeta' }) {
    const claseCaja = variante === 'tarjeta' ? Styles.opcionTarjeta : Styles.opcionChip
    const claseGrupo = variante === 'tarjeta' ? Styles.opcionesTarjeta : Styles.opcionesChip

    return (
        <fieldset className={Styles.grupo}>
            <legend className={Styles.grupoTitulo}>{legend}</legend>

            <div className={claseGrupo}>
                {opciones.map((op) => (
                    <label key={op.valor} className={Styles.opcion}>
                        <input
                            className={Styles.opcionInput}
                            type="radio"
                            name={name}
                            value={op.valor}
                            checked={valor === op.valor}
                            onChange={() => onChange(op.valor)}
                        />
                        <span className={claseCaja}>
                            <span className={Styles.opcionTexto}>{op.label}</span>
                            {op.detalle && <span className={Styles.opcionDetalle}>{op.detalle}</span>}
                        </span>
                    </label>
                ))}
            </div>
        </fieldset>
    )
}

/* =========================
   Detalle (se monta con key={producto.id}: al cambiar de producto
   las selecciones se reinician solas)
   ========================= */

function Detalle({ producto, relacionados }) {
    const navigate = useNavigate()
    const { addToCart } = useCart()

    const [imagenActiva, setImagenActiva] = useState(0)
    const [indicePresentacion, setIndicePresentacion] = useState(0)
    const [moliendaElegida, setMoliendaElegida] = useState(null)
    const [cantidad, setCantidad] = useState(1)

    const imagenes = producto.imagenes?.length ? producto.imagenes : [producto.imagen]
    const presentaciones = producto.presentaciones ?? []
    const moliendas = producto.moliendas ?? []

    const presentacion = presentaciones[indicePresentacion]
    const molienda = moliendaElegida ?? moliendas[0]
    const precio = presentacion?.precio ?? producto.precio

    const agotado = producto.stock === 0
    const stockBajo = producto.stock > 0 && producto.stock <= STOCK_BAJO
    const textoStock = agotado
        ? 'Agotado'
        : stockBajo
            ? `Últimas ${producto.stock} unidades`
            : 'En stock'

    const incrementar = () => setCantidad((c) => Math.min(c + 1, producto.stock))
    const decrementar = () => setCantidad((c) => Math.max(c - 1, 1))

const agregarAlCarrito = () => {
    const productoCarrito = {
        ...producto,
        precio,
        presentacion: presentacion?.label ?? null,
        molienda: molienda ?? null,
    }

    addToCart(productoCarrito, cantidad)

    const detalle = [presentacion?.label, molienda]
        .filter(Boolean)
        .join(' · ')

    alert(
        `Agregaste ${cantidad} × ${producto.nombre}${
            detalle ? ` (${detalle})` : ''
        }`
    )
}

    const tieneFicha = producto.ficha || producto.perfil || producto.notas?.length || producto.perfilTexto

    return (
        <main>

            {/* ============ Producto ============ */}
            <div className={Styles.pagina}>

                <nav className={Styles.migas} aria-label="Ruta de navegación">
                    <ol>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/productos">Productos</Link></li>
                        <li aria-current="page">{producto.nombre}</li>
                    </ol>
                </nav>

                <div className={Styles.principal}>

                    {/* Galería */}
                    <div className={Styles.galeria}>
                        <div className={Styles.imagenPrincipal}>
                            <img
                                className={Styles.imagen}
                                src={imagenes[imagenActiva]}
                                alt={producto.nombre}
                            />
                            {producto.etiqueta && (
                                <span className={Styles.chipImagen}>{producto.etiqueta}</span>
                            )}
                        </div>

                        {imagenes.length > 1 && (
                            <div className={Styles.miniaturas}>
                                {imagenes.map((src, i) => (
                                    <button
                                        key={src}
                                        type="button"
                                        className={Styles.miniatura}
                                        onClick={() => setImagenActiva(i)}
                                        aria-label={`Ver imagen ${i + 1} de ${imagenes.length}`}
                                        aria-pressed={i === imagenActiva}
                                    >
                                        <img src={src} alt="" loading="lazy" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {producto.cita && (
                            <figure className={Styles.cita}>
                                <blockquote>
                                    <p>“{producto.cita.texto}”</p>
                                </blockquote>
                                {producto.cita.autor && <figcaption>{producto.cita.autor}</figcaption>}
                            </figure>
                        )}
                    </div>

                    {/* Información y compra */}
                    <div className={Styles.info}>

                        {producto.lote && <p className={Styles.lote}>{producto.lote}</p>}

                        <ul className={Styles.tags}>
                            {producto.tipo && <li className={Styles.tag}>{producto.tipo}</li>}
                            <li
                                className={`${Styles.tag} ${agotado ? Styles.tagAgotado : stockBajo ? Styles.tagBajo : Styles.tagStock}`}
                            >
                                {textoStock}
                            </li>
                        </ul>

                        <h1 className={Styles.titulo}>{producto.nombre}</h1>

                        <p className={Styles.precio}>
                            {formatearPrecio(precio)}
                            <span className={Styles.precioNota}>IVA incluido</span>
                        </p>

                        <p className={Styles.descripcion}>{producto.descripcion}</p>

                        {presentaciones.length > 0 && (
                            <GrupoOpciones
                                legend="Presentación"
                                name="presentacion"
                                variante="tarjeta"
                                valor={String(indicePresentacion)}
                                onChange={(v) => setIndicePresentacion(Number(v))}
                                opciones={presentaciones.map((p, i) => ({
                                    valor: String(i),
                                    label: p.label,
                                    detalle: p.detalle,
                                }))}
                            />
                        )}

                        {moliendas.length > 0 && (
                            <GrupoOpciones
                                legend="Tipo de molienda"
                                name="molienda"
                                variante="chip"
                                valor={molienda}
                                onChange={setMoliendaElegida}
                                opciones={moliendas.map((m) => ({ valor: m, label: m }))}
                            />
                        )}

                        {/* Cantidad + agregar */}
                        <div className={Styles.compra}>
                            <div className={Styles.contador} role="group" aria-label={`Cantidad de ${producto.nombre}`}>
                                <button
                                    type="button"
                                    className={Styles.botonContador}
                                    onClick={decrementar}
                                    disabled={agotado || cantidad <= 1}
                                    aria-label="Quitar una unidad"
                                >
                                    {ICONOS.menos}
                                </button>
                                <span className={Styles.cantidad} aria-live="polite">{cantidad}</span>
                                <button
                                    type="button"
                                    className={Styles.botonContador}
                                    onClick={incrementar}
                                    disabled={agotado || cantidad >= producto.stock}
                                    aria-label="Agregar una unidad"
                                >
                                    {ICONOS.mas}
                                </button>
                            </div>

                            <button
                                type="button"
                                className={Styles.botonCarrito}
                                onClick={agregarAlCarrito}
                                disabled={agotado}
                            >
                                {ICONOS.bolsa}
                                {agotado ? 'Sin stock' : 'Agregar al carrito'}
                            </button>
                        </div>

                        <ul className={Styles.garantias}>
                            {GARANTIAS.map(({ icono, texto }) => (
                                <li key={icono} className={Styles.garantia}>
                                    <span className={Styles.garantiaIcono}>{ICONOS[icono]}</span>
                                    {texto}
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>

            {/* ============ Ficha técnica ============ */}
            {tieneFicha && (
                <section className={Styles.bandaFicha} aria-labelledby="ficha-titulo">
                    <div className={Styles.contenedor}>

                        <div className={Styles.fichaTexto}>
                            <span className={Styles.etiquetaSeccion}>Ficha técnica</span>
                            <h2 id="ficha-titulo" className={Styles.tituloSeccion}>Perfil del café</h2>

                            {producto.perfilTexto && (
                                <p className={Styles.parrafo}>{producto.perfilTexto}</p>
                            )}

                            {producto.notas?.length > 0 && (
                                <>
                                    <h3 className={Styles.subtitulo}>Notas de cata</h3>
                                    <ul className={Styles.notas}>
                                        {producto.notas.map((n) => (
                                            <li key={n} className={Styles.nota}>{n}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>

                        <div className={Styles.fichaDatos}>
                            {producto.ficha && (
                                <dl className={Styles.lista}>
                                    {ETIQUETAS_FICHA.filter(([clave]) => producto.ficha[clave]).map(([clave, etiqueta]) => (
                                        <div key={clave} className={Styles.filaLista}>
                                            <dt>{etiqueta}</dt>
                                            <dd>{producto.ficha[clave]}</dd>
                                        </div>
                                    ))}
                                </dl>
                            )}

                            {producto.perfil && (
                                <div className={Styles.barras}>
                                    {ETIQUETAS_PERFIL.filter(([clave]) => producto.perfil[clave] != null).map(([clave, etiqueta]) => {
                                        const valor = producto.perfil[clave]
                                        return (
                                            <div key={clave} className={Styles.barra}>
                                                <div className={Styles.barraTexto}>
                                                    <span>{etiqueta}</span>
                                                    <span>{valor}/5</span>
                                                </div>
                                                <div
                                                    className={Styles.barraPista}
                                                    role="img"
                                                    aria-label={`${etiqueta}: ${valor} de 5`}
                                                >
                                                    <div
                                                        className={Styles.barraRelleno}
                                                        style={{ width: `${(valor / 5) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                    </div>
                </section>
            )}

            {/* ============ Método ============ */}
            {producto.metodo?.length > 0 && (
                <section className={Styles.bandaMetodo} aria-labelledby="metodo-titulo">
                    <div className={Styles.contenedorColumna}>
                        <header className={Styles.encabezadoSeccion}>
                            <span className={Styles.etiquetaSeccion}>El método</span>
                            <h2 id="metodo-titulo" className={Styles.tituloSeccion}>
                                Ritual de preparación sugerido
                            </h2>
                        </header>

                        <ol className={Styles.pasos}>
                            {producto.metodo.map(({ titulo, texto, nota }, i) => (
                                <li key={titulo} className={Styles.paso}>
                                    <span className={Styles.pasoNumero}>0{i + 1}</span>
                                    <h3 className={Styles.pasoTitulo}>{titulo}</h3>
                                    <p className={Styles.pasoTexto}>{texto}</p>
                                    {nota && <p className={Styles.pasoNota}>{nota}</p>}
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>
            )}

            {/* ============ También puede gustarte ============ */}
            {relacionados.length > 0 && (
                <section className={Styles.bandaRelacionados} aria-labelledby="relacionados-titulo">
                    <div className={Styles.contenedorColumna}>
                        <header className={Styles.encabezadoSeccion}>
                            <span className={Styles.etiquetaSeccion}>Selección complementaria</span>
                            <h2 id="relacionados-titulo" className={Styles.tituloSeccion}>
                                También puede gustarte
                            </h2>
                        </header>

                        <div className={Styles.gridRelacionados}>
                            {relacionados.map((p) => (
                                <Item
                                    key={p.id}
                                    imagen={p.imagen}
                                    nombre={p.nombre}
                                    precio={p.precio}
                                    tipo={p.tipo}
                                    descripcion={p.descripcion}
                                    stock={p.stock}
                                    etiqueta={p.etiqueta}
                                    presentacion={p.presentacion}
                                    onVerDetalle={() => navigate(`/productos/${p.id}`)}
                                />
                            ))}
                        </div>

                        <p className={Styles.verTodo}>
                            <Link to="/productos" className={Styles.enlaceFlecha}>
                                Ver colección completa →
                            </Link>
                        </p>
                    </div>
                </section>
            )}

        </main>
    )
}

/* =========================
   Carga de datos (se hace una sola vez; el producto se busca por id)
   ========================= */

function useProductos() {
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

export default function ProductoDetalle() {
    const { id } = useParams()
    const { cargando, error, productos } = useProductos()

    // Se compara como texto: evita problemas con parseInt y ids no numéricos
    const producto = useMemo(() => productos.find((p) => String(p.id) === id), [productos, id])

    const relacionados = useMemo(() => {
        if (!producto) return []
        // Primero los del mismo tipo; si faltan, se completa con el resto
        const otros = productos.filter((p) => p.id !== producto.id)
        const mismoTipo = otros.filter((p) => p.tipo === producto.tipo)
        const resto = otros.filter((p) => p.tipo !== producto.tipo)
        return [...mismoTipo, ...resto].slice(0, 3)
    }, [productos, producto])

    // Al abrir otro producto, volver arriba y actualizar el título de la pestaña
    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [id])

    useEffect(() => {
        if (producto) document.title = `${producto.nombre} | BRUMA`
    }, [producto])

    if (cargando) {
        return (
            <main className={Styles.estado}>
                <p role="status">Cargando el producto…</p>
            </main>
        )
    }

    if (error) {
        return (
            <main className={Styles.estado}>
                <h1 className={Styles.tituloEstado}>No pudimos cargar el producto</h1>
                <p>Revisá tu conexión e intentá de nuevo en unos minutos.</p>
                <Link to="/productos" className={Styles.enlaceFlecha}>← Volver a productos</Link>
            </main>
        )
    }

    if (!producto) {
        return (
            <main className={Styles.estado}>
                <h1 className={Styles.tituloEstado}>Producto no encontrado</h1>
                <p>Es posible que ya no esté disponible o que el enlace sea incorrecto.</p>
                <Link to="/productos" className={Styles.enlaceFlecha}>← Volver a productos</Link>
            </main>
        )
    }

    return <Detalle key={producto.id} producto={producto} relacionados={relacionados} />
}