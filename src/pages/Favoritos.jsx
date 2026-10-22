
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import ItemList from '../components/Productos/ItemList.jsx';
// import { useFavoritos } from '../utils/useFavoritos.js';
// import Styles from '../css/Favoritos.module.css';

// export default function Favoritos() {
//     const { favoritos, borrarFavoritos } = useFavoritos();
//     const [productos, setProductos] = useState([]);
//     const [cargando, setCargando] = useState(true);
//     const [error, setError] = useState(null);


//     useEffect(() => {
//         let activo = true;

//         fetch('/data/productos.json')
//             .then((respuesta) => {
//                 if (!respuesta.ok) {
//                     throw new Error('No se pudieron cargar los cafés.');
//                 }

//                 return respuesta.json();
//             })
//             .then((datos) => {
//                 if (activo) setProductos(datos);
//             })
//             .catch((error) => {
//                 if (activo) setError(error.message);
//             })
//             .finally(() => {
//                 if (activo) setCargando(false);
//             });

//         return () => {
//             activo = false;
//         };
//     }, []);

//     const productosFavoritos = productos.filter((producto) =>
//         favoritos.includes(producto.id)
//     );

//     return (
//         <main className={Styles.pagina}>
//             <header className={Styles.encabezado}>
//                 <p className={Styles.eyebrow}>BRUMA · TU SELECCIÓN PERSONAL</p>
//                 <h1 className={Styles.titulo}>Mis favoritos</h1>
                
//                 {!cargando && !error && productosFavoritos.length > 0 && (
//                     <>
//                         <div className={Styles.barraAcciones}>
//                             <p className={Styles.resultados}>
//                                 {productosFavoritos.length === 1
//                                     ? '1 café guardado'
//                                     : `${productosFavoritos.length} cafés guardados`}
//                             </p>

//                             <button
//                                 type="button"
//                                 className={Styles.botonBorrar}
//                                 onClick={() => {
//                                     const confirmar = window.confirm(
//                                         '¿Querés borrar todos tus favoritos?'
//                                     );

//                                     if (confirmar) {
//                                         borrarFavoritos();
//                                     }
//                                 }}
//                             >
//                                 <span aria-hidden="true">×</span>
//                                 Borrar todos
//                             </button>
//                         </div>
//                     </>
//                 )}
//                 <p className={Styles.descripcion}>
//                     Esos cafés que te gustaron y querés volver a encontrar.
//                 </p>
//             </header>
//             {cargando ? (
//                 <p>Cargando tus favoritos...</p>
//             ) : error ? (
//                 <p role="alert">{error}</p>
//             ) : productosFavoritos.length > 0 ? (
//                 <>
//                     <p>
//                         {productosFavoritos.length === 1
//                             ? '1 café guardado'
//                             : `${productosFavoritos.length} cafés guardados`}
//                     </p>

//                     <ItemList productos={productosFavoritos} />
//                 </>
//             ) : (
//                 <section className="favoritos-vacios">
//                     <p>♡</p>
//                     <h2>Tu selección empieza acá</h2>
//                     <p>
//                         Todavía no guardaste cafés. Explorá el catálogo y
//                         marcá con el corazón los que quieras tener a mano.
//                     </p>
//                     <Link to="/productos">Explorar cafés</Link>
//                 </section>
//             )}

//         </main>
//     );
// }



import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemList from '../components/Productos/ItemList.jsx';
import { useFavoritos } from '../utils/useFavoritos.js';
import Styles from '../css/Favoritos.module.css';
import ClubBruma from '../components/ClubBruma.jsx';

export default function Favoritos() {
    const { favoritos, borrarFavoritos } = useFavoritos();

    console.log('IDs guardados en favoritos:', favoritos);

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let activo = true;

        fetch('/data/productos.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('No se pudieron cargar los cafés.');
                }

                return respuesta.json();
            })
            .then((datos) => {
                if (activo) {
                    setProductos(datos);
                }
            })
            .catch((error) => {
                if (activo) {
                    setError(error.message);
                }
            })
            .finally(() => {
                if (activo) {
                    setCargando(false);
                }
            });

        return () => {
            activo = false;
        };
    }, []);

const productosFavoritos = productos.filter((producto) =>
    favoritos.some((id) => String(id) === String(producto.id))
);

console.log(
    'IDs de productos:',
    productos.map((p) => p.id)
);

console.log(
    'Productos encontrados:',
    productosFavoritos.map((p) => p.nombre)
);

    const confirmarBorrado = () => {
        const confirmar = window.confirm(
            '¿Querés quitar todos los productos de tus favoritos?'
        );

        if (confirmar) {
            borrarFavoritos();
        }
    };

    return (
        <main className={Styles.pagina}>
            <header className={Styles.encabezado}>
                <p className={Styles.eyebrow}>
                    Colección personal
                </p>

                <h1 className={Styles.titulo}>
                    Tu Selección Guardada
                </h1>

                <p className={Styles.descripcion}>
                    Esos cafés que te gustaron y querés volver a encontrar.
                    Guardá tus favoritos y tenelos siempre a mano para tu
                    próximo ritual.
                </p>
            </header>

            {cargando ? (
                <p className={Styles.mensajeEstado}>
                    Cargando tu selección...
                </p>
            ) : error ? (
                <p className={Styles.mensajeEstado} role="alert">
                    {error}
                </p>
            ) : productosFavoritos.length > 0 ? (
                <>
                    <div className={Styles.barraAcciones}>
                        <p
                            className={Styles.resultados}
                            aria-live="polite"
                        >
                            <span className={Styles.numeroResultados}>
                                {productosFavoritos.length}
                            </span>
                            {' '}
                            {productosFavoritos.length === 1
                                ? 'producto guardado'
                                : 'productos guardados'}
                        </p>

                        <button
                            type="button"
                            className={Styles.botonBorrar}
                            onClick={confirmarBorrado}
                        >
                            <span aria-hidden="true">×</span>
                            Borrar todos
                        </button>
                    </div>

                    <section
                        className={Styles.catalogo}
                        aria-label="Productos favoritos"
                    >
                        <ItemList productos={productosFavoritos} />
                    </section>
                </>
            ) : (
                <section className={Styles.vacio}>
                    <span
                        className={Styles.corazonVacio}
                        aria-hidden="true"
                    >
                        ♡
                    </span>

                    <p className={Styles.eyebrow}>
                        Tu próxima elección
                    </p>

                    <h2 className={Styles.tituloVacio}>
                        Tu lista de favoritos está vacía
                    </h2>

                    <p className={Styles.textoVacio}>
                        Explorá nuestros cafés y guardá los que acompañarán
                        tus mañanas. Encontrá tu próximo favorito en nuestra
                        colección.
                    </p>

                    <Link
                        to="/productos"
                        className={Styles.enlace}
                    >
                        Explorar cafés
                        <span aria-hidden="true"> ↗</span>
                    </Link>
                </section>

                
            )}

            <ClubBruma />
        </main>
    );
}
