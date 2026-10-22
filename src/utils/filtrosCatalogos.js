/* =========================
   Utilidades del catálogo (sin React: fáciles de probar)
   Trabajan con la estructura de productos.json
   ========================= */

export const FILTROS_INICIALES = {
    q: '',            // búsqueda de texto
    tipo: '',         // p.tipo
    tueste: '',       // p.ficha.tueste
    origen: '',       // país (derivado de p.ficha.origen)
    perfil: '',       // id de PERFILES
    precio: '',       // id de RANGOS_PRECIO
    orden: 'relevancia',
}

/** Minúsculas y sin acentos: "Etiopía" y "etiopia" coinciden. */
export const normalizar = (texto = '') =>
    String(texto).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

/* ---------- Tueste ---------- */

const ORDEN_TUESTE = ['Claro', 'Medio claro', 'Medio', 'Medio oscuro', 'Oscuro']

/* ---------- Origen ----------
   ficha.origen es texto libre ("Brasil y Colombia", "Colombia (Huila)", "Indonesia (Sumatra)").
   Para poder filtrar por país se detectan estos nombres dentro del texto. */

const PAISES = [
    'Brasil', 'Colombia', 'Etiopía', 'Guatemala', 'Costa Rica',
    'Perú', 'Kenia', 'México', 'Ruanda', 'Indonesia', 'Nicaragua',
]
const ALIAS_PAIS = { Sumatra: 'Indonesia' }

export function paisesDe(producto) {
    const origen = normalizar(producto.ficha?.origen)
    const encontrados = new Set()

    PAISES.forEach((pais) => {
        if (origen.includes(normalizar(pais))) encontrados.add(pais)
    })
    Object.entries(ALIAS_PAIS).forEach(([alias, pais]) => {
        if (origen.includes(normalizar(alias))) encontrados.add(pais)
    })

    return [...encontrados]
}

/* ---------- Perfil de taza (usa producto.perfil: acidez, cuerpo, dulzura de 0 a 5) ---------- */

export const PERFILES = [
    { id: 'frutal', label: 'Frutal y brillante', test: (p) => p.perfil && p.perfil.acidez >= 3.5 },
    { id: 'dulce', label: 'Dulce y suave', test: (p) => p.perfil && p.perfil.acidez <= 3 && p.perfil.dulzura >= 4 },
    { id: 'intenso', label: 'Cuerpo intenso', test: (p) => p.perfil && p.perfil.cuerpo >= 4 },
]

/* ---------- Precio ---------- */

export const RANGOS_PRECIO = [
    { id: 'hasta-6000', label: 'Hasta $6.000', test: (precio) => precio <= 6000 },
    { id: '6000-8000', label: 'Entre $6.000 y $8.000', test: (precio) => precio > 6000 && precio <= 8000 },
    { id: 'mas-8000', label: 'Más de $8.000', test: (precio) => precio > 8000 },
]

/* ---------- Orden ---------- */

export const ORDENES = [
    { id: 'relevancia', label: 'Destacados' },
    { id: 'precio-asc', label: 'Precio: menor a mayor' },
    { id: 'precio-desc', label: 'Precio: mayor a menor' },
    { id: 'nombre', label: 'Nombre A–Z' },
]

/* =========================
   Opciones disponibles, calculadas desde los datos
   ========================= */

export function derivarOpciones(productos) {
    const conteo = new Map()
    productos.forEach((p) => conteo.set(p.tipo, (conteo.get(p.tipo) ?? 0) + 1))

    const tipos = [...conteo.entries()]
        .map(([valor, cantidad]) => ({ valor, cantidad }))
        .sort((a, b) => b.cantidad - a.cantidad || a.valor.localeCompare(b.valor, 'es'))

    const tuestes = ORDEN_TUESTE.filter((t) => productos.some((p) => p.ficha?.tueste === t))

    const origenes = [...new Set(productos.flatMap(paisesDe))].sort((a, b) => a.localeCompare(b, 'es'))

    return { tipos, tuestes, origenes }
}

/* =========================
   Filtrado y orden
   ========================= */

export const hayFiltrosActivos = (filtros) =>
    Object.entries(filtros).some(([clave, valor]) => clave !== 'orden' && Boolean(valor))

export function aplicarFiltros(productos, filtros) {
    const palabras = normalizar(filtros.q).split(/\s+/).filter(Boolean)
    const perfil = PERFILES.find((x) => x.id === filtros.perfil)
    const rango = RANGOS_PRECIO.find((x) => x.id === filtros.precio)

    const lista = productos.filter((p) => {
        if (filtros.tipo && p.tipo !== filtros.tipo) return false
        if (filtros.tueste && p.ficha?.tueste !== filtros.tueste) return false
        if (filtros.origen && !paisesDe(p).includes(filtros.origen)) return false
        if (perfil && !perfil.test(p)) return false
        if (rango && !rango.test(p.precio)) return false

        if (palabras.length > 0) {
            const texto = normalizar(
                [
                    p.nombre,
                    p.tipo,
                    p.etiqueta,
                    p.descripcion,
                    p.notas?.join(' '),
                    p.ficha?.origen,
                    p.ficha?.tueste,
                ].join(' ')
            )
            // Todas las palabras escritas deben aparecer
            if (!palabras.every((palabra) => texto.includes(palabra))) return false
        }

        return true
    })

    switch (filtros.orden) {
        case 'precio-asc':
            return [...lista].sort((a, b) => a.precio - b.precio)
        case 'precio-desc':
            return [...lista].sort((a, b) => b.precio - a.precio)
        case 'nombre':
            return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
        default:
            return lista // orden original del JSON
    }
}