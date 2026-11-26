
// import { useState } from 'react';
// import {
//     collection,
//     getDocs,
//     query,
//     where,
//     doc,
//     setDoc
// } from 'firebase/firestore';

// import { db } from '../../firebase/config.js';
// import FormularioProducto from './FormularioProducto';

// const crearEstadoInicial = () => ({
//     id: '',
//     nombre: '',
//     tipo: '',
//     etiqueta: '',
//     descripcion: '',
//     precio: '',
//     stock: '',
//     imagen: '',
//     imagenes: [],
//     lote: '',
//     presentacion: '',
//     perfilTexto: '',
//     perfil: {
//         acidez: 1,
//         cuerpo: 1,
//         dulzura: 1
//     },
//     notas: [],
//     ficha: {
//         origen: '',
//         altitud: '',
//         proceso: '',
//         tueste: '',
//         variedad: ''
//     },
//     moliendas: [],
//     metodo: [],
//     presentaciones: [],
//     cita: {
//         autor: '',
//         texto: ''
//     }
// });

// function generarSlug(nombre) {
//     return nombre
//         .normalize('NFD')
//         .replace(/[\u0300-\u036f]/g, '')
//         .toLowerCase()
//         .trim()
//         .replace(/[^a-z0-9]+/g, '-')
//         .replace(/^-|-$/g, '');
// }

// export function FormularioContainer() {
//     const [datosForm, setDatosForm] = useState(crearEstadoInicial);
//     const [imagenFile, setImagenFile] = useState(null);
//     const [imagenesFiles, setImagenesFiles] = useState([]);
//     const [enviando, setEnviando] = useState(false);

//     const manejarCambio = (evento) => {
//         const { name, value } = evento.target;

//         setDatosForm((actuales) => ({
//             ...actuales,
//             [name]: value
//         }));
//     };

//     const manejarCambioAnidado = (grupo, campo, valor) => {
//         setDatosForm((actuales) => ({
//             ...actuales,
//             [grupo]: {
//                 ...actuales[grupo],
//                 [campo]: valor
//             }
//         }));
//     };

//     const manejarCambioLista = (lista, indice, valor) => {
//         setDatosForm((actuales) => ({
//             ...actuales,
//             [lista]: actuales[lista].map((elemento, i) =>
//                 i === indice ? valor : elemento
//             )
//         }));
//     };

//     const agregarElemento = (lista, elementoInicial = '') => {
//         setDatosForm((actuales) => ({
//             ...actuales,
//             [lista]: [...actuales[lista], elementoInicial]
//         }));
//     };

//     const quitarElemento = (lista, indice) => {
//         setDatosForm((actuales) => ({
//             ...actuales,
//             [lista]: actuales[lista].filter((_, i) => i !== indice)
//         }));
//     };

//     const manejarCambioObjetoLista = (lista, indice, campo, valor) => {
//         setDatosForm((actuales) => ({
//             ...actuales,
//             [lista]: actuales[lista].map((elemento, i) =>
//                 i === indice
//                     ? { ...elemento, [campo]: valor }
//                     : elemento
//             )
//         }));
//     };

//     const agregarObjetoLista = (lista, objetoInicial) => {
//         setDatosForm((actuales) => ({
//             ...actuales,
//             [lista]: [...actuales[lista], objetoInicial]
//         }));
//     };

//     const manejarCambioImagen = (evento) => {
//         setImagenFile(evento.target.files[0] || null);
//     };

//     const manejarCambioImagenes = (evento) => {
//         setImagenesFiles(Array.from(evento.target.files || []));
//     };

//     const subirImagen = async (archivo) => {
//         const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

//         if (!apiKey) {
//             throw new Error('Falta configurar VITE_IMGBB_API_KEY.');
//         }

//         const formData = new FormData();
//         formData.append('image', archivo);

//         const respuesta = await fetch(
//             `https://api.imgbb.com/1/upload?key=${apiKey}`,
//             {
//                 method: 'POST',
//                 body: formData
//             }
//         );

//         const datos = await respuesta.json();

//         if (!respuesta.ok || !datos.success) {
//             throw new Error('No se pudo subir una de las imágenes.');
//         }

//         return datos.data.image.url;
//     };

//     const manejarEnvio = async (evento) => {
//         evento.preventDefault();

//         if (!datosForm.imagen.trim() && !imagenFile) {
//             alert('Ingresá la URL de la imagen principal o seleccioná un archivo.');
//             return;
//         }

//         if (!datosForm.id || Number(datosForm.id) <= 0) {
//             alert('Ingresá un ID numérico válido.');
//             return;
//         }

//         setEnviando(true);

//         try {
//             const idNumerico = Number(datosForm.id);

//             // Comprobamos que el ID numérico no esté utilizado.
//             const referenciaProductos = collection(db, 'productos');
//             const consultaId = query(
//                 referenciaProductos,
//                 where('id', '==', idNumerico)
//             );

//             const resultadoId = await getDocs(consultaId);

//             if (!resultadoId.empty) {
//                 throw new Error(`El ID ${idNumerico} ya existe.`);
//             }

//             // Imagen principal: archivo seleccionado o URL ingresada.
//             let imagenPrincipal = datosForm.imagen.trim();

//             if (imagenFile) {
//                 imagenPrincipal = await subirImagen(imagenFile);
//             }

//             // Galería: URLs ingresadas y archivos seleccionados.
//             const imagenesSubidas = await Promise.all(
//                 imagenesFiles.map((archivo) => subirImagen(archivo))
//             );

//             const galeria = [
//                 ...datosForm.imagenes
//                     .map((url) => url.trim())
//                     .filter(Boolean),
//                 ...imagenesSubidas
//             ];

//             const productoCompleto = {
//                 id: idNumerico,
//                 nombre: datosForm.nombre.trim(),
//                 tipo: datosForm.tipo.trim(),
//                 etiqueta: datosForm.etiqueta.trim(),
//                 descripcion: datosForm.descripcion.trim(),
//                 precio: Number(datosForm.precio),
//                 stock: Number(datosForm.stock),
//                 imagen: imagenPrincipal,
//                 imagenes: galeria.length > 0
//                     ? [...new Set(galeria)]
//                     : [imagenPrincipal],
//                 lote: datosForm.lote.trim(),
//                 presentacion: datosForm.presentacion.trim(),
//                 perfilTexto: datosForm.perfilTexto.trim(),

//                 perfil: {
//                     acidez: Number(datosForm.perfil.acidez),
//                     cuerpo: Number(datosForm.perfil.cuerpo),
//                     dulzura: Number(datosForm.perfil.dulzura)
//                 },

//                 notas: datosForm.notas
//                     .map((nota) => nota.trim())
//                     .filter(Boolean),

//                 ficha: {
//                     origen: datosForm.ficha.origen.trim(),
//                     altitud: datosForm.ficha.altitud.trim(),
//                     proceso: datosForm.ficha.proceso.trim(),
//                     tueste: datosForm.ficha.tueste.trim(),
//                     variedad: datosForm.ficha.variedad.trim()
//                 },

//                 moliendas: datosForm.moliendas
//                     .map((molienda) => molienda.trim())
//                     .filter(Boolean),

//                 metodo: datosForm.metodo.filter(
//                     (item) => item.titulo.trim() || item.texto.trim()
//                 ),

//                 presentaciones: datosForm.presentaciones.map((item) => ({
//                     label: item.label.trim(),
//                     detalle: item.detalle.trim(),
//                     precio: Number(item.precio)
//                 })),

//                 cita: {
//                     autor: datosForm.cita.autor.trim(),
//                     texto: datosForm.cita.texto.trim()
//                 }
//             };

//             // Guardamos el producto en la colección existente.
//             const slug = generarSlug(productoCompleto.nombre);

//             // Agregamos el ID numérico para evitar colisiones
//             const identificadorDocumento = `${slug}-${productoCompleto.id}`;

//             const referenciaDocumento = doc(
//                 db,
//                 'productos',
//                 identificadorDocumento
//             );

//             await setDoc(referenciaDocumento, productoCompleto);

//             alert('¡Producto guardado correctamente en BRUMA!');

//             setDatosForm(crearEstadoInicial());
//             setImagenFile(null);
//             setImagenesFiles([]);

//             evento.target.reset();

//         } catch (error) {
//             console.error('Error al guardar el producto:', error);
//             alert(error.message || 'No se pudo guardar el producto.');
//         } finally {
//             setEnviando(false);
//         }
//     };

//     return (
//         <FormularioProducto
//             datosForm={datosForm}
//             manejarCambio={manejarCambio}
//             manejarCambioAnidado={manejarCambioAnidado}
//             manejarCambioLista={manejarCambioLista}
//             agregarElemento={agregarElemento}
//             quitarElemento={quitarElemento}
//             manejarCambioObjetoLista={manejarCambioObjetoLista}
//             agregarObjetoLista={agregarObjetoLista}
//             manejarCambioImagen={manejarCambioImagen}
//             manejarCambioImagenes={manejarCambioImagenes}
//             manejarEnvio={manejarEnvio}
//             enviando={enviando}
//         />
//     );
// }


import { useState } from 'react';
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    setDoc,
    updateDoc
} from 'firebase/firestore';

import { db } from '../../firebase/config.js';
import FormularioProducto from './FormularioProducto';

const crearEstadoInicial = () => ({
    id: '',
    nombre: '',
    tipo: '',
    etiqueta: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: '',
    imagenes: [],
    lote: '',
    presentacion: '',
    perfilTexto: '',
    perfil: {
        acidez: 1,
        cuerpo: 1,
        dulzura: 1
    },
    notas: [],
    ficha: {
        origen: '',
        altitud: '',
        proceso: '',
        tueste: '',
        variedad: ''
    },
    moliendas: [],
    metodo: [],
    presentaciones: [],
    cita: {
        autor: '',
        texto: ''
    }
});

function generarSlug(nombre) {
    return nombre
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function prepararDatosProducto(producto) {
    const inicial = crearEstadoInicial();

    return {
        ...inicial,
        ...producto,
        perfil: {
            ...inicial.perfil,
            ...(producto.perfil || {})
        },
        ficha: {
            ...inicial.ficha,
            ...(producto.ficha || {})
        },
        cita: {
            ...inicial.cita,
            ...(producto.cita || {})
        },
        imagenes: producto.imagenes || [],
        notas: producto.notas || [],
        moliendas: producto.moliendas || [],
        metodo: producto.metodo || [],
        presentaciones: producto.presentaciones || []
    };
}

export function FormularioContainer({
    productoEditar = null,
    onGuardado,
    onCancelar
}) {
    const [datosForm, setDatosForm] = useState(() =>
        productoEditar
            ? prepararDatosProducto(productoEditar)
            : crearEstadoInicial()
    );
    const [imagenFile, setImagenFile] = useState(null);
    const [imagenesFiles, setImagenesFiles] = useState([]);
    const [enviando, setEnviando] = useState(false);

    const modoEdicion = Boolean(productoEditar);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;

        setDatosForm((actuales) => ({
            ...actuales,
            [name]: value
        }));
    };

    const manejarCambioAnidado = (grupo, campo, valor) => {
        setDatosForm((actuales) => ({
            ...actuales,
            [grupo]: {
                ...actuales[grupo],
                [campo]: valor
            }
        }));
    };

    const manejarCambioLista = (lista, indice, valor) => {
        setDatosForm((actuales) => ({
            ...actuales,
            [lista]: actuales[lista].map((elemento, i) =>
                i === indice ? valor : elemento
            )
        }));
    };

    const agregarElemento = (lista, elementoInicial = '') => {
        setDatosForm((actuales) => ({
            ...actuales,
            [lista]: [...actuales[lista], elementoInicial]
        }));
    };

    const quitarElemento = (lista, indice) => {
        setDatosForm((actuales) => ({
            ...actuales,
            [lista]: actuales[lista].filter((_, i) => i !== indice)
        }));
    };

    const manejarCambioObjetoLista = (lista, indice, campo, valor) => {
        setDatosForm((actuales) => ({
            ...actuales,
            [lista]: actuales[lista].map((elemento, i) =>
                i === indice
                    ? { ...elemento, [campo]: valor }
                    : elemento
            )
        }));
    };

    const agregarObjetoLista = (lista, objetoInicial) => {
        setDatosForm((actuales) => ({
            ...actuales,
            [lista]: [...actuales[lista], objetoInicial]
        }));
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0] || null);
    };

    const manejarCambioImagenes = (evento) => {
        setImagenesFiles(Array.from(evento.target.files || []));
    };

    const subirImagen = async (archivo) => {
        const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

        if (!apiKey) {
            throw new Error('Falta configurar VITE_IMGBB_API_KEY.');
        }

        const formData = new FormData();
        formData.append('image', archivo);

        const respuesta = await fetch(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            {
                method: 'POST',
                body: formData
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok || !datos.success) {
            throw new Error('No se pudo subir una de las imágenes.');
        }

        return datos.data.image.url;
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        if (!datosForm.imagen.trim() && !imagenFile) {
            alert('Ingresá la URL de la imagen principal o seleccioná un archivo.');
            return;
        }

        if (!datosForm.id || Number(datosForm.id) <= 0) {
            alert('Ingresá un ID numérico válido.');
            return;
        }

        setEnviando(true);

        try {
            const idNumerico = Number(datosForm.id);

            // En ambos modos comprobamos que el ID no pertenezca
            // a otro producto.
            const referenciaProductos = collection(db, 'productos');
            const consultaId = query(
                referenciaProductos,
                where('id', '==', idNumerico)
            );

            const resultadoId = await getDocs(consultaId);

            const idUtilizadoPorOtroProducto = resultadoId.docs.some(
                (documento) => documento.id !== productoEditar?.firestoreId
            );

            if (idUtilizadoPorOtroProducto) {
                throw new Error(`El ID ${idNumerico} ya existe.`);
            }

            let imagenPrincipal = datosForm.imagen.trim();

            if (imagenFile) {
                imagenPrincipal = await subirImagen(imagenFile);
            }

            const imagenesSubidas = await Promise.all(
                imagenesFiles.map((archivo) => subirImagen(archivo))
            );

            const galeria = [
                imagenPrincipal,
                ...datosForm.imagenes.map((url) => url.trim()).filter(Boolean),
                ...imagenesSubidas
            ];

            const productoCompleto = {
                id: idNumerico,
                nombre: datosForm.nombre.trim(),
                tipo: datosForm.tipo.trim(),
                etiqueta: datosForm.etiqueta.trim(),
                descripcion: datosForm.descripcion.trim(),
                precio: Number(datosForm.precio),
                stock: Number(datosForm.stock),
                imagen: imagenPrincipal,
                imagenes: [...new Set(galeria)],
                lote: datosForm.lote.trim(),
                presentacion: datosForm.presentacion.trim(),
                perfilTexto: datosForm.perfilTexto.trim(),

                perfil: {
                    acidez: Number(datosForm.perfil.acidez),
                    cuerpo: Number(datosForm.perfil.cuerpo),
                    dulzura: Number(datosForm.perfil.dulzura)
                },

                notas: datosForm.notas
                    .map((nota) => nota.trim())
                    .filter(Boolean),

                ficha: {
                    origen: datosForm.ficha.origen.trim(),
                    altitud: datosForm.ficha.altitud.trim(),
                    proceso: datosForm.ficha.proceso.trim(),
                    tueste: datosForm.ficha.tueste.trim(),
                    variedad: datosForm.ficha.variedad.trim()
                },

                moliendas: datosForm.moliendas
                    .map((molienda) => molienda.trim())
                    .filter(Boolean),

                metodo: datosForm.metodo.filter(
                    (item) => item.titulo.trim() || item.texto.trim()
                ),

                presentaciones: datosForm.presentaciones.map((item) => ({
                    label: item.label.trim(),
                    detalle: item.detalle.trim(),
                    precio: Number(item.precio)
                })),

                cita: {
                    autor: datosForm.cita.autor.trim(),
                    texto: datosForm.cita.texto.trim()
                }
            };

            if (modoEdicion) {
                // Actualizamos el documento existente.
                const referenciaDocumento = doc(
                    db,
                    'productos',
                    productoEditar.firestoreId
                );

                await updateDoc(referenciaDocumento, productoCompleto);

                alert('¡Producto actualizado correctamente!');
            } else {
                // Creamos un documento nuevo.
                const slug = generarSlug(productoCompleto.nombre);
                const identificadorDocumento =
                    `${slug}-${productoCompleto.id}`;

                const referenciaDocumento = doc(
                    db,
                    'productos',
                    identificadorDocumento
                );

                await setDoc(referenciaDocumento, productoCompleto);

                alert('¡Producto guardado correctamente en BRUMA!');
            }

            setDatosForm(crearEstadoInicial());
            setImagenFile(null);
            setImagenesFiles([]);
            evento.target.reset();

            if (onGuardado) {
                await onGuardado();
            }
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            alert(error.message || 'No se pudo guardar el producto.');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarCambioAnidado={manejarCambioAnidado}
            manejarCambioLista={manejarCambioLista}
            agregarElemento={agregarElemento}
            quitarElemento={quitarElemento}
            manejarCambioObjetoLista={manejarCambioObjetoLista}
            agregarObjetoLista={agregarObjetoLista}
            manejarCambioImagen={manejarCambioImagen}
            manejarCambioImagenes={manejarCambioImagenes}
            manejarEnvio={manejarEnvio}
            enviando={enviando}
            modoEdicion={modoEdicion}
            onCancelar={onCancelar}
        />
    );
}

