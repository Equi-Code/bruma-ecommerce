import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Styles from '../../css/Filtros.module.css'
import Item from './Item.jsx'
import useProductos from '../Cart/UseProductos.jsx'
import {
    FILTROS_INICIALES,
    ORDENES,
    PERFILES,
    RANGOS_PRECIO,
    aplicarFiltros,
    derivarOpciones,
    hayFiltrosActivos,
} from '../../utils/filtrosCatalogos.js'

/* =========================
   Estado de los filtros
   - sincronizarUrl: los guarda en la URL (?tipo=...&q=...). Así se pueden compartir
     y el botón "atrás" desde el detalle vuelve a la lista ya filtrada.
   - sin sincronizar: quedan en memoria (útil en el Home).
   ========================= */

function useFiltros(sincronizarUrl) {
    const [params, setParams] = useSearchParams()
    const [local, setLocal] = useState(FILTROS_INICIALES)

    const filtros = useMemo(() => {
        if (!sincronizarUrl) return local

        const desdeUrl = {}
        Object.keys(FILTROS_INICIALES).forEach((clave) => {
            const valor = params.get(clave)
            if (valor) desdeUrl[clave] = valor
        })
        return { ...FILTROS_INICIALES, ...desdeUrl }
    }, [sincronizarUrl, local, params])

    const cambiar = (clave, valor) => {
        if (!sincronizarUrl) {
            setLocal((actual) => ({ ...actual, [clave]: valor }))
            return
        }

        setParams(
            (anterior) => {
                const siguiente = new URLSearchParams(anterior)
                if (!valor || valor === FILTROS_INICIALES[clave]) siguiente.delete(clave)
                else siguiente.set(clave, valor)
                return siguiente
            },
            { replace: true }
        )
    }

    const limpiar = () => {
        if (sincronizarUrl) setParams({}, { replace: true })
        else setLocal(FILTROS_INICIALES)
    }

    return { filtros, cambiar, limpiar }
}

/* Select con etiqueta y opción "Todos" */
function Selector({ id, etiqueta, valor, onChange, opciones, textoTodos = 'Todos' }) {
    return (
        <div className={Styles.controlSelect}>
            <label htmlFor={id}>{etiqueta}</label>
            <select id={id} value={valor} onChange={(e) => onChange(e.target.value)}>
                <option value="">{textoTodos}</option>
                {opciones.map((o) => (
                    <option key={o.valor} value={o.valor}>{o.label}</option>
                ))}
            </select>
        </div>
    )
}

/* =========================
   Catálogo

   Props:
   - sincronizarUrl: guarda los filtros en la URL (úsalo en /productos)
   - compacto:       solo muestra chips de tipo y un enlace "Ver todo" (úsalo en el Home)
   - limite:         máximo de tarjetas a mostrar (útil con compacto)
   ========================= */

export default function CatalogoFiltrable({ compacto = false, limite, sincronizarUrl = false }) {
    const navigate = useNavigate()
    const { cargando, error, productos } = useProductos()
    const { filtros, cambiar, limpiar } = useFiltros(sincronizarUrl)

    const opciones = useMemo(() => derivarOpciones(productos), [productos])
    const resultado = useMemo(() => aplicarFiltros(productos, filtros), [productos, filtros])

    if (cargando) {
        return <p className={Styles.estado} role="status">Cargando productos…</p>
    }

    if (error) {
        return (
            <p className={Styles.estado}>
                No pudimos cargar los productos. Intentá de nuevo en unos minutos.
            </p>
        )
    }

    const hayFiltros = hayFiltrosActivos(filtros)
    const visibles = compacto && limite ? resultado.slice(0, limite) : resultado

    // En la versión compacta solo se ofrecen los tipos con más de un producto
    const tiposChips = compacto
        ? opciones.tipos.filter((t) => t.cantidad >= 2)
        : opciones.tipos

    const enlaceVerTodo = filtros.tipo
        ? `/productos?tipo=${encodeURIComponent(filtros.tipo)}`
        : '/productos'

    return (
        <div>
            <form
                className={Styles.filtrosContenedor}
                role="search"
                aria-label="Filtrar productos"
                onSubmit={(e) => e.preventDefault()}
            >

                {/* Buscador + orden */}
                {!compacto && (
                    <div className={Styles.filtrosPrincipales}>
                        <div>
                            <label htmlFor="filtro-busqueda" className={Styles.soloLectores}>
                                Buscar productos
                            </label>
                            <input
                                id="filtro-busqueda"
                                type="search"
                                className={Styles.inputBusqueda}
                                placeholder="Buscar por nombre, origen o nota de cata…"
                                value={filtros.q}
                                onChange={(e) => cambiar('q', e.target.value)}
                                autoComplete="off"
                            />
                        </div>

                        <div className={Styles.controlSelect}>
                            <label htmlFor="filtro-orden">Ordenar por</label>
                            <select
                                id="filtro-orden"
                                value={filtros.orden}
                                onChange={(e) => cambiar('orden', e.target.value)}
                            >
                                {ORDENES.map((o) => (
                                    <option key={o.id} value={o.id}>{o.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {/* Chips de tipo */}
                <div
                    className={`${Styles.chips} ${compacto ? Styles.chipsCentrados : ''}`}
                    role="group"
                    aria-label="Tipo de producto"
                >
                    <button
                        type="button"
                        className={Styles.chip}
                        aria-pressed={!filtros.tipo}
                        onClick={() => cambiar('tipo', '')}
                    >
                        Todos <span className={Styles.chipCantidad}>{productos.length}</span>
                    </button>

                    {tiposChips.map(({ valor, cantidad }) => (
                        <button
                            key={valor}
                            type="button"
                            className={Styles.chip}
                            aria-pressed={filtros.tipo === valor}
                            onClick={() => cambiar('tipo', filtros.tipo === valor ? '' : valor)}
                        >
                            {valor} <span className={Styles.chipCantidad}>{cantidad}</span>
                        </button>
                    ))}
                </div>

                {/* Selectores avanzados */}
                {!compacto && (
                    <div className={Styles.filtrosSelectores}>
                        <Selector
                            id="filtro-tueste"
                            etiqueta="Tueste"
                            valor={filtros.tueste}
                            onChange={(v) => cambiar('tueste', v)}
                            opciones={opciones.tuestes.map((t) => ({ valor: t, label: t }))}
                        />
                        <Selector
                            id="filtro-origen"
                            etiqueta="Origen"
                            valor={filtros.origen}
                            onChange={(v) => cambiar('origen', v)}
                            opciones={opciones.origenes.map((o) => ({ valor: o, label: o }))}
                        />
                        <Selector
                            id="filtro-perfil"
                            etiqueta="Perfil de taza"
                            valor={filtros.perfil}
                            onChange={(v) => cambiar('perfil', v)}
                            opciones={PERFILES.map((p) => ({ valor: p.id, label: p.label }))}
                        />
                        <Selector
                            id="filtro-precio"
                            etiqueta="Precio"
                            valor={filtros.precio}
                            onChange={(v) => cambiar('precio', v)}
                            opciones={RANGOS_PRECIO.map((r) => ({ valor: r.id, label: r.label }))}
                            textoTodos="Cualquiera"
                        />

                        {hayFiltros && (
                            <button type="button" className={Styles.btnLimpiar} onClick={limpiar}>
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                )}

                {/* Conteo (se anuncia a lectores de pantalla al cambiar) */}
                {!compacto && (
                    <p className={Styles.conteo} aria-live="polite">
                        {resultado.length === productos.length
                            ? `${productos.length} productos`
                            : `Mostrando ${resultado.length} de ${productos.length} productos`}
                    </p>
                )}
            </form>

            {/* Resultados */}
            {visibles.length > 0 ? (
                <div className={Styles.grid}>
                    {visibles.map((p) => (
                        <Item
                            key={p.id}
                            id={p.id}
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
            ) : (
                <div className={Styles.vacio}>
                    <p className={Styles.vacioTitulo}>No encontramos productos con esos filtros</p>
                    <p>Probá con otra búsqueda o quitá alguno de los filtros.</p>
                    {hayFiltros && (
                        <button type="button" className={Styles.btnLimpiar} onClick={limpiar}>
                            Limpiar filtros
                        </button>
                    )}
                </div>
            )}

            {compacto && (
                <p className={Styles.verTodo}>
                    <Link to={enlaceVerTodo} className={Styles.enlaceVerTodo}>
                        Ver todo el catálogo ({resultado.length}) →
                    </Link>
                </p>
            )}
        </div>
    )
}