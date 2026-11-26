
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const credenciales = require('../serviceAccountKey.json');

const app = initializeApp({
    credential: cert(credenciales),
});

const db = getFirestore(app);

// Documento que vamos a copiar
const ID_ORIGEN = 'blend-bruma';

// Identificador del nuevo documento
const ID_NUEVO = 'blueberry-cheesecake';

async function duplicarProducto() {
    try {
        // Comprobar que el documento original exista
        const referenciaOrigen = db.collection('productos').doc(ID_ORIGEN);
        const documentoOrigen = await referenciaOrigen.get();

        if (!documentoOrigen.exists) {
            throw new Error(`No existe el producto ${ID_ORIGEN}`);
        }

        // Comprobar que el nuevo documento no exista
        const referenciaNuevo = db.collection('productos').doc(ID_NUEVO);
        const documentoNuevo = await referenciaNuevo.get();

        if (documentoNuevo.exists) {
            throw new Error(`El producto ${ID_NUEVO} ya existe`);
        }

        // Obtener los productos para generar un ID numérico único
        const productos = await db.collection('productos').get();

        const ids = productos.docs
            .map(doc => Number(doc.data().id))
            .filter(id => Number.isFinite(id));

        const nuevoId = Math.max(0, ...ids) + 1;

        // Copiar todos los campos y modificar los identificadores
        const productoDuplicado = {
            ...documentoOrigen.data(),
            id: nuevoId,
            nombre: 'Blueberry Cheesecake',
        };

        // Crear el nuevo documento
        await referenciaNuevo.set(productoDuplicado);

        console.log('Producto duplicado correctamente');
        console.log('Documento:', ID_NUEVO);
        console.log('ID numérico:', nuevoId);

    } catch (error) {
        console.error('Error al duplicar:', error.message);
    } finally {
        await app.delete();
    }
}

duplicarProducto();
