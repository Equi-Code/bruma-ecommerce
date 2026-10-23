import { Link } from 'react-router-dom'
import Styles from '../css/About.module.css'
import equipo from '../../public/data/equipo.json' // ajusta la ruta a donde esté tu archivo

const RUTAS = {
    productos: '/productos',
    contacto: '/contacto',
}

/* ⚠️ Textos y cifras tomados del diseño de referencia: confirma que sean ciertos para BRUMA
   (fincas, puntaje SCA, certificaciones, precios por encima de comercio justo, etc.) */

const MANIFIESTO = {
    etiqueta: 'Nuestra identidad y filosofía',
    titulo: 'El origen de nuestra pasión por el grano perfecto.',
    texto:
        'Nacimos de una inquietud silenciosa: la necesidad de detener el ritmo vertiginoso del mundo contemporáneo para rendir tributo al trabajo de la tierra. Recorremos microfincas en alturas vertiginosas de Huila en Colombia, las mesetas ancestrales de Yirgacheffe en Etiopía y los valles de Minas Gerais en Brasil. No negociamos con intermediarios opacos; trazamos cada lote por nombre, altitud y manos recolectoras, transformando cada taza en un testimonio vivo de su terruño originario.',
    cita: 'Tostar café es un diálogo entre la temperatura del aire y la memoria química del fruto.',
    sello: 'Tostado consciente artesanal • Lotes numerados',
    curaduriaTitulo: 'Curaduría ética',
    curaduriaTexto: '100% comercio directo y trazable',
}

const PILARES = [
    {
        etiqueta: 'Origen',
        titulo: 'Selección en finca',
        texto: 'Cosecha manual selectiva, grano a grano, en el punto óptimo de madurez. Establecemos vínculos estrechos y directos con pequeños productores andinos y africanos, remunerando por encima de los estándares de comercio justo para garantizar cosechas excepcionales.',
        dato: { etiqueta: 'Variedades', valor: 'Geisha • Bourbon • Caturra' },
    },
    {
        etiqueta: 'Laboratorio',
        titulo: 'Curva de tueste',
        texto: 'Microlotes de 5 kg trabajados semanalmente en tambor de hierro fundido. Diseñamos perfiles térmicos milimétricos mediante software de flujo de aire que exaltan los azúcares naturales y las notas de terroir, huyendo del tueste oscuro estandarizado.',
        dato: { etiqueta: 'Capacidad', valor: 'Lote 5 kg • Tueste medio-claro' },
    },
    {
        etiqueta: 'Extracción',
        titulo: 'El ritual en barra',
        texto: 'Geometría de vertido controlada por baristas especializados. Ajustamos granulometría, mineralización del agua a 65 ppm y temperatura de 92 °C para revelar acidez cítrica radiante, cuerpos aterciopelados y retrogustos florales prolongados.',
        dato: { etiqueta: 'Métodos', valor: 'Sifón • V60 • Aeropress' },
    },
]

const EDITORIAL = {
    imagen: '/img/contacto.jpg', // la foto del sifón; cámbiala si prefieres otra
    alt: 'Cafetera sifón de vidrio sobre la barra del laboratorio de BRUMA',
    chip: 'Laboratorio Buenos Aires • Método sifón',
    cita: 'El café no es un producto acelerado; es una pausa intencional en medio del día.',
    firma: 'Cuaderno de tueste BRUMA',
    firmaNota: 'Edición limitada — Reflexiones sobre la infusión consciente',
    medidor: {
        etiqueta: 'Tiempo de infusión sugerido',
        valor: '03:45 min',
        progreso: 75,
        nota: 'Extracción equilibrada para notas a flor de jazmín y cacao 70%.',
    },
}

const CIFRAS = [
    { valor: '+12', titulo: 'Fincas asociadas', texto: 'Relaciones estables y directas en Colombia, Etiopía, Kenia y Brasil.' },
    { valor: '100%', titulo: 'Arábica de altura', texto: 'Cultivado a más de 1.600 msnm con maduración lenta y sombra nativa.' },
    { valor: '85+', titulo: 'Puntuación SCA', texto: 'Calificación sobresaliente en taza libre de defectos primarios.' },
    { valor: '48 h', titulo: 'Del tostador a casa', texto: 'Despachos con fecha de tueste estampada para una óptima desgasificación.' },
]

/* Iconos SVG inline (sin dependencias) */
function Icono({ children, size = 18, grosor = 1.7 }) {
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
    sello: (
        <Icono size={16}>
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="m9 12 2 2 4-4" />
        </Icono>
    ),
    hoja: (
        <Icono size={20}>
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </Icono>
    ),
    cita: (
        <Icono size={40} grosor={1.2}>
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </Icono>
    ),
    flecha: (
        <Icono>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </Icono>
    ),
}

export default function Nosotros() {
    return (
        <main>

            {/* ============ Manifiesto ============ */}
            <section className={Styles.manifiesto} aria-labelledby="nosotros-titulo">
                <div>
                    <span className={Styles.etiqueta}>{MANIFIESTO.etiqueta}</span>
                    <h1 id="nosotros-titulo" className={Styles.titulo}>{MANIFIESTO.titulo}</h1>
                    <p className={Styles.lead}>{MANIFIESTO.texto}</p>
                </div>

                <aside className={Styles.manifiestoLateral}>
                    <figure className={Styles.manifiestoCard}>
                        <span className={Styles.cardEtiqueta}>Manifiesto 01 / Fundamento</span>
                        <blockquote className={Styles.manifiestoCita}>
                            <p>«{MANIFIESTO.cita}»</p>
                        </blockquote>
                        <figcaption className={Styles.sello}>
                            {ICONOS.sello}
                            {MANIFIESTO.sello}
                        </figcaption>
                    </figure>

                    <div className={Styles.curaduria}>
                        <span className={Styles.curaduriaIcono}>{ICONOS.hoja}</span>
                        <div>
                            <p className={Styles.curaduriaTitulo}>{MANIFIESTO.curaduriaTitulo}</p>
                            <p className={Styles.curaduriaTexto}>{MANIFIESTO.curaduriaTexto}</p>
                        </div>
                    </div>
                </aside>
            </section>

            {/* ============ Pilares ============ */}
            <section className={Styles.pilaresBanda} aria-labelledby="pilares-titulo">
                <div className={Styles.contenedor}>

                    <header className={Styles.encabezadoSeccion}>
                        <div>
                            <span className={Styles.etiqueta}>Metodología y rigor</span>
                            <h2 id="pilares-titulo" className={Styles.tituloSeccion}>
                                Nuestros tres pilares de maestría
                            </h2>
                        </div>
                        <p className={Styles.textoSeccion}>
                            Cada eslabón responde a una ciencia exacta calibrada por el paladar y la
                            paciencia del artesano.
                        </p>
                    </header>

                    <ol className={Styles.pilares}>
                        {PILARES.map(({ etiqueta, titulo, texto, dato }, i) => (
                            <li key={titulo} className={Styles.pilar}>
                                <div className={Styles.pilarTope}>
                                    <span className={Styles.pilarNumero} aria-hidden="true">0{i + 1}</span>
                                    <span className={Styles.pilarTag}>{etiqueta}</span>
                                </div>

                                <h3 className={Styles.pilarTitulo}>{titulo}</h3>
                                <p className={Styles.pilarTexto}>{texto}</p>

                                <dl className={Styles.pilarDato}>
                                    <dt>{dato.etiqueta}</dt>
                                    <dd>{dato.valor}</dd>
                                </dl>
                            </li>
                        ))}
                    </ol>

                </div>
            </section>

            {/* ============ Fotografía editorial + cita ============ */}
            <section className={Styles.editorial} aria-label="Reflexión de BRUMA">
                <div className={Styles.editorialCaja}>

                    <figure className={Styles.editorialFoto}>
                        <img
                            className={Styles.editorialImg}
                            src={EDITORIAL.imagen}
                            alt={EDITORIAL.alt}
                            loading="lazy"
                        />
                        <figcaption className={Styles.editorialChip}>{EDITORIAL.chip}</figcaption>
                    </figure>

                    <div className={Styles.editorialCita}>
                        <span className={Styles.citaIcono}>{ICONOS.cita}</span>

                        <blockquote className={Styles.citaTexto}>
                            <p>{EDITORIAL.cita}</p>
                        </blockquote>

                        <p className={Styles.firma}>{EDITORIAL.firma}</p>
                        <p className={Styles.firmaNota}>{EDITORIAL.firmaNota}</p>

                        <div className={Styles.medidor}>
                            <div className={Styles.medidorFila}>
                                <span>{EDITORIAL.medidor.etiqueta}</span>
                                <span>{EDITORIAL.medidor.valor}</span>
                            </div>
                            <div
                                className={Styles.medidorPista}
                                role="img"
                                aria-label={`${EDITORIAL.medidor.etiqueta}: ${EDITORIAL.medidor.valor}`}
                            >
                                <div
                                    className={Styles.medidorRelleno}
                                    style={{ width: `${EDITORIAL.medidor.progreso}%` }}
                                />
                            </div>
                            <p className={Styles.medidorNota}>{EDITORIAL.medidor.nota}</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* ============ Equipo ============ */}
            <section className={Styles.equipo} aria-labelledby="equipo-titulo">
                <header className={Styles.equipoEncabezado}>
                    <span className={Styles.etiquetaCentrada}>Oficio humano y precisión</span>
                    <h2 id="equipo-titulo" className={Styles.tituloSeccion}>
                        Las mentes detrás de cada grano
                    </h2>
                    <p className={Styles.textoSeccion}>
                        La calidad de nuestra selección vive en la sincronía entre ciencia térmica,
                        memoria sensorial y un compromiso indeclinable con el caficultor.
                    </p>
                </header>

                <ul className={Styles.equipoGrid}>
                    {equipo.map(({ id, nombre, cargo, imagen, insignia, bio, descripcion, especialidad }) => (
                        <li key={id ?? nombre}>
                            <article className={Styles.miembro}>
                                <div className={Styles.miembroMarco}>
                                    {insignia && <span className={Styles.miembroInsignia}>{insignia}</span>}
                                    <img
                                        className={Styles.miembroFoto}
                                        src={imagen}
                                        alt={`Retrato de ${nombre}`}
                                        width="360"
                                        height="440"
                                        loading="lazy"
                                    />
                                </div>

                                <div className={Styles.miembroCuerpo}>
                                    <p className={Styles.miembroCargo}>{cargo}</p>
                                    <h3 className={Styles.miembroNombre}>{nombre}</h3>
                                    <p className={Styles.miembroBio}>{bio ?? descripcion}</p>

                                    {especialidad && (
                                        <dl className={Styles.miembroEspecialidad}>
                                            <dt>Especialidad</dt>
                                            <dd>{especialidad}</dd>
                                        </dl>
                                    )}
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </section>

            {/* ============ Cifras ============ */}
            <section className={Styles.cifrasBanda} aria-labelledby="cifras-titulo">
                <div className={Styles.contenedor}>
                    <header className={Styles.cifrasEncabezado}>
                        <span className={Styles.etiqueta}>Indicadores de calidad</span>
                        <h2 id="cifras-titulo" className={Styles.tituloSeccion}>
                            El estándar irrenunciable de BRUMA
                        </h2>
                    </header>

                    <ul className={Styles.cifras}>
                        {CIFRAS.map(({ valor, titulo, texto }) => (
                            <li key={titulo} className={Styles.cifra}>
                                <span className={Styles.cifraValor}>{valor}</span>
                                <span className={Styles.cifraTitulo}>{titulo}</span>
                                <p className={Styles.cifraTexto}>{texto}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ============ Llamado a la acción ============ */}
            <section className={Styles.cta} aria-labelledby="cta-titulo">
                <div className={Styles.ctaCaja}>
                    <span className={Styles.etiquetaCentrada}>Comenzar la experiencia</span>
                    <h2 id="cta-titulo" className={Styles.tituloSeccion}>¿Querés experimentar nuestro café?</h2>
                    <p className={Styles.ctaTexto}>
                        Descubrí nuestros perfiles de tueste actuales: lotes limitados con descriptores
                        de jazmín silvestre, ciruela negra, chocolate amargo y miel de panela.
                    </p>

                    <div className={Styles.acciones}>
                        <Link to={RUTAS.productos} className={Styles.botonPrincipal}>
                            Ver catálogo de cafés
                            {ICONOS.flecha}
                        </Link>
                        <Link to={RUTAS.contacto} className={Styles.botonSecundario}>
                            Consultar por catas privadas
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    )
}