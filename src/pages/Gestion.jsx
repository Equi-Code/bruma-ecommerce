
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../src/firebase/config.js';

import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from 'firebase/firestore';

import { FormularioContainer } from '../components/Formulario/FormularioContainer';
import Styles from '../css/Gestion.module.css';

// Consulta Firestore y devuelve los productos.
async function obtenerProductos() {
    const productosRef = collection(db, 'productos');
    const respuesta = await getDocs(productosRef);

    return respuesta.docs.map((documento) => ({
        ...documento.data(),
        firestoreId: documento.id
    }));
}

function formatearPrecio(valor) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(Number(valor) || 0);
}

function obtenerEstado(stock) {
    const cantidad = Number(stock) || 0;

    if (cantidad <= 0) {
        return { texto: 'Agotado', clase: 'agotado' };
    }

    if (cantidad <= 5) {
        return { texto: 'Bajo stock', clase: 'bajo' };
    }

    return { texto: 'En stock', clase: 'disponible' };
}

function escaparCSV(valor) {
    const texto = String(valor ?? '').replace(/"/g, '""');
    return `"${texto}"`;
}

export default function Gestion() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [errorCarga, setErrorCarga] = useState(false);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [productoEditar, setProductoEditar] = useState(null);

    const [busqueda, setBusqueda] = useState('');
    const [categoriaActiva, setCategoriaActiva] = useState('todos');

    const [productoEliminar, setProductoEliminar] = useState(null);
    const [eliminando, setEliminando] = useState(false);

    // Carga inicial.
    useEffect(() => {
        let activo = true;

        const consultarProductos = async () => {
            try {
                const datos = await obtenerProductos();

                if (activo) {
                    setProductos(datos);
                    setErrorCarga(false);
                }
            } catch (error) {
                console.error('Error al consultar productos:', error);

                if (activo) {
                    setErrorCarga(true);
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        };

        consultarProductos();

        return () => {
            activo = false;
        };
    }, []);

    // Actualiza el listado después de crear o modificar.
    const cargarProductos = async () => {
        try {
            const datos = await obtenerProductos();
            setProductos(datos);
            setErrorCarga(false);
        } catch (error) {
            console.error('Error al actualizar productos:', error);
        }
    };

    // Categorías reales obtenidas del campo tipo.
    const categorias = useMemo(() => {
        return [...new Set(
            productos
                .map((producto) => producto.tipo)
                .filter(Boolean)
        )].sort((a, b) => a.localeCompare(b, 'es'));
    }, [productos]);

    // Filtro de búsqueda y categoría.
    const productosFiltrados = useMemo(() => {
        const termino = busqueda.trim().toLowerCase();

        return productos.filter((producto) => {
            const coincideCategoria =
                categoriaActiva === 'todos' ||
                producto.tipo === categoriaActiva;

            const textoBusqueda = [
                producto.nombre,
                producto.descripcion,
                producto.tipo,
                producto.lote,
                producto.id,
                producto.ficha?.origen
            ].join(' ').toLowerCase();

            const coincideBusqueda =
                !termino || textoBusqueda.includes(termino);

            return coincideCategoria && coincideBusqueda;
        });
    }, [productos, busqueda, categoriaActiva]);

    // Indicadores calculados con los datos disponibles.
    const indicadores = useMemo(() => {
        const enStock = productos.filter(
            (producto) => Number(producto.stock) > 0
        ).length;

        const agotados = productos.filter(
            (producto) => Number(producto.stock) <= 0
        ).length;

        const unidades = productos.reduce(
            (total, producto) => total + (Number(producto.stock) || 0),
            0
        );

        const valorInventario = productos.reduce(
            (total, producto) =>
                total +
                (Number(producto.precio) || 0) *
                (Number(producto.stock) || 0),
            0
        );

        return {
            total: productos.length,
            enStock,
            agotados,
            unidades,
            valorInventario
        };
    }, [productos]);

    const abrirFormularioNuevo = () => {
        setProductoEditar(null);
        setMostrarFormulario(true);
    };

    const abrirFormularioEdicion = (producto) => {
        setProductoEditar(producto);
        setMostrarFormulario(true);
    };

    const cerrarFormulario = () => {
        setProductoEditar(null);
        setMostrarFormulario(false);
    };

    const handleGuardado = async () => {
        await cargarProductos();
        cerrarFormulario();
    };

    // Modal de confirmación y eliminación.
    const confirmarEliminacion = async () => {
        if (!productoEliminar || eliminando) return;

        try {
            setEliminando(true);

            const docRef = doc(
                db,
                'productos',
                productoEliminar.firestoreId
            );

            await deleteDoc(docRef);

            setProductos((actuales) =>
                actuales.filter(
                    (producto) =>
                        producto.firestoreId !== productoEliminar.firestoreId
                )
            );

            if (
                productoEditar?.firestoreId ===
                productoEliminar.firestoreId
            ) {
                cerrarFormulario();
            }

            setProductoEliminar(null);
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('No se pudo eliminar el producto.');
        } finally {
            setEliminando(false);
        }
    };

    // Exportación del catálogo filtrado a CSV.
    const exportarCSV = () => {
        const encabezados = [
            'ID',
            'Producto',
            'Tipo',
            'Lote',
            'Precio',
            'Stock',
            'Origen'
        ];

        const filas = productosFiltrados.map((producto) => [
            producto.id,
            producto.nombre,
            producto.tipo,
            producto.lote,
            producto.precio,
            producto.stock,
            producto.ficha?.origen
        ]);

        const contenido = [
            encabezados,
            ...filas
        ]
            .map((fila) => fila.map(escaparCSV).join(';'))
            .join('\n');

        const archivo = new Blob(
            ['\uFEFF' + contenido],
            { type: 'text/csv;charset=utf-8;' }
        );

        const url = URL.createObjectURL(archivo);
        const enlace = document.createElement('a');

        enlace.href = url;
        enlace.download = 'bruma-inventario.csv';
        enlace.click();

        URL.revokeObjectURL(url);
    };

    return (
        <main className={Styles.gestion}>
            <div className={Styles.contenedor}>

                {/* Encabezado y navegación */}
                <header className={Styles.encabezado}>
                    <div className={Styles.migas}>
                        <Link to="/">INICIO</Link>
                        <span>/</span>
                        <span>ADMINISTRACIÓN</span>
                        <span>/</span>
                        <strong>GESTIÓN DE PRODUCTOS</strong>

                        <span className={Styles.estadoPanel}>
                            <i />
                            PANEL BRUMA ACTIVO
                        </span>
                    </div>

                    <div className={Styles.encabezadoPrincipal}>
                        <div className={Styles.introduccion}>
                            <span className={Styles.sobreTitulo}>
                                BRUMA · CAFÉ DE ESPECIALIDAD
                            </span>

                            <h1>Gestión de Catálogo &amp; Lotes</h1>

                            <p>
                                Administrá el inventario de cafés de origen,
                                blends y productos de BRUMA. Controlá fichas
                                técnicas, precios y stock desde un solo lugar.
                            </p>
                        </div>

                        <div className={Styles.accionesEncabezado}>
                            <button
                                type="button"
                                className={Styles.botonSecundario}
                                onClick={exportarCSV}
                                disabled={productosFiltrados.length === 0}
                            >
                                <span aria-hidden="true">↓</span>
                                Exportar CSV
                            </button>

                            <button
                                type="button"
                                className={Styles.botonPrincipal}
                                onClick={abrirFormularioNuevo}
                            >
                                <span aria-hidden="true">＋</span>
                                Crear nuevo producto
                            </button>
                        </div>
                    </div>
                </header>

                {/* Indicadores */}
                <section
                    className={Styles.indicadores}
                    aria-label="Métricas de inventario"
                >
                    <article className={Styles.tarjetaIndicador}>
                        <div className={Styles.indicadorCabecera}>
                            <span>TOTAL PRODUCTOS</span>
                            <span aria-hidden="true">▤</span>
                        </div>
                        <strong>{indicadores.total} ítems</strong>
                        <p>
                            {indicadores.enStock} con stock · {indicadores.agotados} agotados
                        </p>
                    </article>

                    <article className={Styles.tarjetaIndicador}>
                        <div className={Styles.indicadorCabecera}>
                            <span>UNIDADES EN INVENTARIO</span>
                            <span aria-hidden="true">▣</span>
                        </div>
                        <strong>{indicadores.unidades}</strong>
                        <p>Unidades disponibles registradas</p>
                    </article>

                    <article className={Styles.tarjetaIndicador}>
                        <div className={Styles.indicadorCabecera}>
                            <span>VALOR DE INVENTARIO</span>
                            <span aria-hidden="true">$</span>
                        </div>
                        <strong>{formatearPrecio(indicadores.valorInventario)}</strong>
                        <p>Precio por cantidad en stock</p>
                    </article>

                    <article className={Styles.tarjetaIndicador}>
                        <div className={Styles.indicadorCabecera}>
                            <span>PRODUCTOS AGOTADOS</span>
                            <span aria-hidden="true">◷</span>
                        </div>
                        <strong>{indicadores.agotados}</strong>
                        <p>Productos sin unidades disponibles</p>
                    </article>
                </section>

                {/* Inventario */}
                <section className={Styles.panelInventario}>
                    <div className={Styles.barraFiltros}>
                        <label className={Styles.busqueda}>
                            <span aria-hidden="true">⌕</span>
                            <input
                                type="search"
                                value={busqueda}
                                onChange={(evento) => setBusqueda(evento.target.value)}
                                placeholder="Buscar por nombre, origen, lote o ID..."
                                aria-label="Buscar productos"
                            />
                        </label>

                        <div className={Styles.filtrosCategorias}>
                            <button
                                type="button"
                                className={
                                    categoriaActiva === 'todos'
                                        ? Styles.filtroActivo
                                        : Styles.filtro
                                }
                                onClick={() => setCategoriaActiva('todos')}
                            >
                                Todos ({productos.length})
                            </button>

                            {categorias.map((categoria) => {
                                const cantidad = productos.filter(
                                    (producto) => producto.tipo === categoria
                                ).length;

                                return (
                                    <button
                                        type="button"
                                        key={categoria}
                                        className={
                                            categoriaActiva === categoria
                                                ? Styles.filtroActivo
                                                : Styles.filtro
                                        }
                                        onClick={() => setCategoriaActiva(categoria)}
                                    >
                                        {categoria} ({cantidad})
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className={Styles.cabeceraTabla}>
                        <div>
                            <span>PRODUCTO &amp; FOTOGRAFÍA</span>
                        </div>
                        <div>SKU / LOTE</div>
                        <div>PRECIO</div>
                        <div>STOCK</div>
                        <div>ESTADO</div>
                        <div className={Styles.alinearDerecha}>ACCIONES</div>
                    </div>

                    {cargando ? (
                        <div className={Styles.estadoVacio}>
                            <p>Cargando inventario...</p>
                        </div>
                    ) : errorCarga ? (
                        <div className={Styles.estadoVacio}>
                            <h2>No se pudo cargar el inventario</h2>
                            <p>Revisá la conexión con Firestore e intentá nuevamente.</p>
                            <button
                                type="button"
                                className={Styles.botonSecundario}
                                onClick={async () => {
                                    setCargando(true);
                                    await cargarProductos();
                                    setCargando(false);
                                }}
                            >
                                Reintentar
                            </button>
                        </div>
                    ) : productosFiltrados.length === 0 ? (
                        <div className={Styles.estadoVacio}>
                            <h2>No encontramos productos</h2>
                            <p>
                                Probá con otra búsqueda o seleccioná otra categoría.
                            </p>
                        </div>
                    ) : (
                        <div className={Styles.filasTabla}>
                            {productosFiltrados.map((producto) => {
                                const estado = obtenerEstado(producto.stock);

                                return (
                                    <article
                                        className={Styles.filaProducto}
                                        key={producto.firestoreId}
                                    >
                                        <div className={Styles.columnaProducto}>
                                            <div className={Styles.fotoProducto}>
                                                {producto.imagen ? (
                                                    <img
                                                        src={producto.imagen}
                                                        alt={producto.nombre}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <span>BRUMA</span>
                                                )}
                                            </div>

                                            <div className={Styles.datosProducto}>
                                                <strong>{producto.nombre}</strong>
                                                <span>
                                                    {producto.descripcion || producto.tipo}
                                                </span>
                                                <small>
                                                    {producto.etiqueta || producto.ficha?.origen || 'Café de especialidad'}
                                                </small>
                                            </div>
                                        </div>

                                        <div className={Styles.datoSku}>
                                            <strong>
                                                {producto.id ?? '—'}
                                            </strong>
                                            <span>
                                                {producto.lote || 'Sin lote'}
                                            </span>
                                        </div>

                                        <div className={Styles.datoPrecio}>
                                            {formatearPrecio(producto.precio)}
                                        </div>

                                        <div className={Styles.datoStock}>
                                            <span className={`${Styles.puntoEstado} ${Styles[estado.clase]}`} />
                                            <strong>{Number(producto.stock) || 0} u.</strong>
                                            <span>{estado.texto}</span>
                                        </div>

                                        <div>
                                            <span className={`${Styles.etiquetaEstado} ${Styles[estado.clase]}`}>
                                                {estado.texto}
                                            </span>
                                        </div>

                                        <div className={Styles.accionesFila}>
                                            <button
                                                type="button"
                                                title="Modificar producto"
                                                aria-label={`Modificar ${producto.nombre}`}
                                                onClick={() => abrirFormularioEdicion(producto)}
                                            >
                                                ✎
                                            </button>

                                            <button
                                                type="button"
                                                title="Eliminar producto"
                                                aria-label={`Eliminar ${producto.nombre}`}
                                                onClick={() => setProductoEliminar(producto)}
                                            >
                                                ♧
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}

                    <footer className={Styles.pieTabla}>
                        <span>
                            Mostrando {productosFiltrados.length} de {productos.length} productos
                        </span>
                    </footer>
                </section>
            </div>

            {/* Drawer de alta y edición */}
            {mostrarFormulario && (
                <div className={Styles.drawerFondo}>
                    <button
                        type="button"
                        className={Styles.drawerOverlay}
                        onClick={cerrarFormulario}
                        aria-label="Cerrar formulario"
                    />

                    <aside
                        className={Styles.drawer}
                        role="dialog"
                        aria-modal="true"
                        aria-label={productoEditar ? 'Modificar producto' : 'Crear producto'}
                    >
                        <div className={Styles.drawerCabecera}>
                            <div>
                                <span className={Styles.sobreTitulo}>
                                    BRUMA · CATÁLOGO
                                </span>
                                <h2>
                                    {productoEditar
                                        ? 'Modificar producto'
                                        : 'Nuevo producto'}
                                </h2>
                            </div>

                            <button
                                type="button"
                                className={Styles.cerrarDrawer}
                                onClick={cerrarFormulario}
                                aria-label="Cerrar"
                            >
                                ×
                            </button>
                        </div>

                        <div className={Styles.drawerContenido}>
                            <FormularioContainer
                                key={productoEditar?.firestoreId || 'nuevo'}
                                productoEditar={productoEditar}
                                onGuardado={handleGuardado}
                                onCancelar={cerrarFormulario}
                            />
                        </div>
                    </aside>
                </div>
            )}

            {/* Modal de confirmación */}
            {productoEliminar && (
                <div className={Styles.modalFondo}>
                    <section
                        className={Styles.modal}
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="tituloEliminar"
                    >
                        <div className={Styles.modalIcono}>!</div>

                        <h2 id="tituloEliminar">
                            ¿Confirmar eliminación?
                        </h2>

                        <p>
                            Estás por eliminar <strong>{productoEliminar.nombre}</strong> del
                            catálogo de BRUMA. Esta acción no se puede deshacer.
                        </p>

                        <div className={Styles.modalAcciones}>
                            <button
                                type="button"
                                className={Styles.botonSecundario}
                                onClick={() => setProductoEliminar(null)}
                                disabled={eliminando}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className={Styles.botonEliminar}
                                onClick={confirmarEliminacion}
                                disabled={eliminando}
                            >
                                {eliminando ? 'Eliminando...' : 'Sí, eliminar producto'}
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
}


