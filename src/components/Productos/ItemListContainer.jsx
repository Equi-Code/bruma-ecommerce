
// import { useState, useEffect, useMemo } from 'react';
// import ItemList from "./ItemList";
// import { FILTROS_INICIALES, aplicarFiltros } from '../../utils/filtrosCatalogos';
// import Filtros from "./Filtros";








// export default function ItemListContainer() {
    

//     const [productos, setProductos] = useState([]);
//     const [error, setError] = useState(null);
//     const [cargando, setCargando] = useState(true); 

//     const [filtros, setFiltros] = useState(FILTROS_INICIALES);

//     useEffect(() => {



//         fetch('/data/productos.json')
//             .then((respuesta) => {
//                 if (!respuesta.ok) {
//                     throw new Error('No se pudo cargar la información de los productos');
//                 }
//                 return respuesta.json();
//             })
//             .then((datos) => {
//                 setProductos(datos);
//             })
//             .catch((error) => {
//                 setError(error.message);
//             })
//             .finally(() => {
//                 setCargando(false);
//             });
//     }, []);

//     const productosFiltrados = useMemo(() => {
//         return aplicarFiltros(productos, filtros)
//     }, [productos, filtros]);


//     if (cargando) {
//         return <p>Cargando productos, por favor espere...</p>;
//     }
//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     return (

//         <section >
//             <div >
//                 <p >BRUMA · CAFÉ DE ESPECIALIDAD</p>
//                 <h1 >Nuestros cafés</h1>
//                 <p>Explorá cafés de distintos orígenes y encontrá tu próximo
//                     favorito.

//                 </p>
//             </div>


//             <Filtros 
//                 productos={productos} 
//                 filtros={filtros} 
//                 setFiltros={setFiltros} 
//             />



//             <div >
//                 <p>
//                     {productosFiltrados.length === 1
//                         ? '1 café encontrado'
//                         : `${productosFiltrados.length} cafés encontrados`}
//                 </p>
//             </div>

//             {productosFiltrados.length > 0 ? (
//                 <ItemList productos={productosFiltrados} />
//             ) : (
//                 <div className="catalogo-vacio">
//                     <h2>No encontramos cafés</h2>
//                     <p>
//                         Probá cambiar los filtros o usar otros términos de
//                         búsqueda.
//                     </p>
//                 </div>
//             )}

//         </section>

//     );
// }




import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../../firebase/config.js';
import ItemList from './ItemList';
import { FILTROS_INICIALES, aplicarFiltros } from '../../utils/filtrosCatalogos';
import Filtros from './Filtros';

export default function ItemListContainer() {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    const [filtros, setFiltros] = useState(FILTROS_INICIALES);

    useEffect(() => {
        let activo = true;

        async function cargarProductos() {
            try {
                setCargando(true);
                setError(null);

                const referenciaProductos = collection(db, 'productos');
                const resultado = await getDocs(referenciaProductos);

                const datos = resultado.docs.map((documento) => ({
                    ...documento.data(),
                    // Conservamos el ID numérico original para los componentes
                    // que lo utilicen y guardamos el ID de Firestore aparte.
                    firestoreId: documento.id,
                }));

                if (activo) {
                    setProductos(datos);
                }
            } catch (error) {
                console.error('Error al cargar productos desde Firestore:', error);

                if (activo) {
                    setError(
                        'No pudimos cargar los productos. Intentá nuevamente más tarde.'
                    );
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        }

        cargarProductos();

        return () => {
            activo = false;
        };
    }, []);

    const productosFiltrados = useMemo(() => {
        return aplicarFiltros(productos, filtros);
    }, [productos, filtros]);

    if (cargando) {
        return <p>Cargando productos, por favor esperá...</p>;
    }

    if (error) {
        return <p role="alert">Error: {error}</p>;
    }

    return (
        <section>
            <div>
                <p>BRUMA · CAFÉ DE ESPECIALIDAD</p>

                <h1>Nuestros cafés</h1>

                <p>
                    Explorá cafés de distintos orígenes y encontrá tu próximo
                    favorito.
                </p>
            </div>

            <Filtros
                productos={productos}
                filtros={filtros}
                setFiltros={setFiltros}
            />

            <div>
                <p>
                    {productosFiltrados.length === 1
                        ? '1 café encontrado'
                        : `${productosFiltrados.length} cafés encontrados`}
                </p>
            </div>

            {productosFiltrados.length > 0 ? (
                <ItemList productos={productosFiltrados} />
            ) : (
                <div className="catalogo-vacio">
                    <h2>No encontramos cafés</h2>
                    <p>
                        Probá cambiar los filtros o usar otros términos de
                        búsqueda.
                    </p>
                </div>
            )}
        </section>
    );
}
