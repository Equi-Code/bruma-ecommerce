
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('node:fs');
const path = require('node:path');

const credenciales = require('../../serviceAccountKey.json');

process.env.GOOGLE_APPLICATION_CREDENTIALS =
  path.resolve(__dirname, '../../serviceAccountKey.json');

const app = initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore(app);

const archivoProductos = path.join(
  __dirname,
  '../data/productos.json'
);

function crearId(nombre) {
  return nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function importarProductos() {
  const productos = JSON.parse(
    fs.readFileSync(archivoProductos, 'utf8')
  );

  if (!Array.isArray(productos)) {
    throw new Error(
      'productos.json debe contener un array de productos.'
    );
  }

  let importados = 0;
  let errores = 0;

  for (const producto of productos) {
    if (!producto.nombre || typeof producto.nombre !== 'string') {
      console.error('Producto sin nombre. Se omite.');
      errores++;
      continue;
    }

    const idDocumento = crearId(producto.nombre);

    if (!idDocumento) {
      console.error('No se pudo generar el ID del producto.');
      errores++;
      continue;
    }

    try {
      await db
        .collection('productos')
        .doc(idDocumento)
        .create(producto);

      console.log(`Importado: ${producto.nombre} (${idDocumento})`);
      importados++;
    } catch (error) {
      console.error(
        `Error al importar "${producto.nombre}":`,
        error.message
      );
      errores++;
    }
  }

  console.log(`\nImportación finalizada.`);
  console.log(`Importados: ${importados}`);
  console.log(`Errores u omitidos: ${errores}`);

  await admin.app().delete();

  if (errores > 0) {
    process.exitCode = 1;
  }
}

importarProductos().catch(async (error) => {
  console.error('Falló la importación:', error.message);

  await admin.app().delete().catch(() => {});
  process.exitCode = 1;
});
