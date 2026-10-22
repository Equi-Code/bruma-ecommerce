import { Link, Routes } from 'react-router-dom';
import { useState } from 'react';
import Styles from '../css/Home.module.css';
import ProductosDestacados from '../components/Productos/ProductosDestacados.jsx';

const VALORES = [
    { titulo: 'Trazabilidad total', texto: 'Identificamos productor, altura y beneficio.' },
    { titulo: 'Tueste artesanal', texto: 'Lotes de 5 kg tostados por encargo semanal.' },
];

function Icono({ children, size = 22 }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {children}
        </svg>
    );
}

const IconoUbicacion = () => (
    <Icono>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </Icono>
);

const IconoCorreo = () => (
    <Icono>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Icono>
);

const IconoFlecha = () => (
    <Icono size={18}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </Icono>
);

const IconoEnviar = () => (
    <Icono size={18}>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
    </Icono>
);

/* Iconos de la franja de beneficios (línea fina) */
const IconoOrigen = () => (
    <Icono size={32} grosor={1.4}>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </Icono>
);

const IconoTueste = () => (
    <Icono size={32} grosor={1.4}>
        <ellipse cx="12" cy="12" rx="6" ry="9" transform="rotate(40 12 12)" />
        <path d="M8.5 15.5c2.5-1 4.5-3 6-6.5" />
    </Icono>
);

const IconoMontana = () => (
    <Icono size={32} grosor={1.4}>
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </Icono>
);

const IconoEnvio = () => (
    <Icono size={32} grosor={1.4}>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
    </Icono>
);

const BENEFICIOS = [
    {
        icono: IconoOrigen,
        titulo: 'Cafés de origen',
        texto: 'Seleccionados con cuidado en cada cosecha.',
    },
    {
        icono: IconoTueste,
        titulo: 'Tueste artesanal',
        texto: 'Resaltamos sus mejores notas y aromas.',
    },
    {
        icono: IconoMontana,
        titulo: 'Comercio responsable',
        texto: 'Trabajamos con productores que cuidan su tierra.',
    },
    {
        icono: IconoEnvio,
        titulo: 'Envíos a todo el país',
        texto: 'Tu café, donde lo necesites.',
    },
];

const METODOS = [
    'Espresso / Cafetera Express',
    'Prensa francesa',
    'Filtro / V60',
    'Moka',
    'Aeropress',
    'Cold brew',
];


export default function Home() {

    const [enviado, setEnviado] = useState(false);

    const manejarContacto = (e) => {
        e.preventDefault();
        const datos = Object.fromEntries(new FormData(e.currentTarget));
        console.log('Consulta de contacto:', datos); // TODO: enviar a tu backend o servicio de email
        e.currentTarget.reset();
        setEnviado(true);
    };

    return (
        <>
            {/* Hero: clases globales de index.css */}
            <section className="hero">
                <div className="hero-content">
                    <span className="hero-eyebrow">Café de especialidad</span>
                    <h1 className="hero-title">
                        Historias que se saborean.
                    </h1>

                    <p className="hero-description">
                        Descubrí nuestra selección de cafés de especialidad,
                        pensados para disfrutar cada taza.
                    </p>

                    <Link to={Routes.productos} className="hero-button">
                        Explorar cafés
                        <IconoFlecha />
                    </Link>
                </div>
            </section>

            v            {/* Beneficios */}
            <ul className={Styles.beneficios} aria-label="Por qué elegir BRUMA">
                {BENEFICIOS.map(({ icono: Ico, titulo, texto }) => (
                    <li key={titulo} className={Styles.beneficio}>
                        <span className={Styles.beneficioIcono}><Ico /></span>
                        <p className={Styles.beneficioTitulo}>{titulo}</p>
                        <p className={Styles.beneficioTexto}>{texto}</p>
                    </li>
                ))}
            </ul>


            {/* Catálogo estacional en la Home */}
            <section className={Styles.catalogo} aria-labelledby="catalogo-titulo">
                <div className={Styles.contenedor}>

                    <header className={Styles.encabezado}>
                        <span className={Styles.etiqueta}>Catálogo estacional</span>
                        <h2 id="catalogo-titulo" className={Styles.titulo}>
                            Una selección para disfrutar
                        </h2>
                        <p className={Styles.descripcion}>
                            Origen, aroma y equilibrio en cada taza.
                            Cafés seleccionados para descubrir nuevos sabores.
                        </p>
                    </header>

                    {/* 
          Inyectamos el nuevo componente simplificado directamente.
          Ya no usamos ItemListContainer aquí para evitar duplicar títulos y filtros.
        */}
                    <ProductosDestacados />

                </div>
            </section>

            {/* Nosotros */}
            <section className={Styles.contenedorNosotros} aria-labelledby="nosotros-titulo">
                <span className={Styles.etiquetaNosotros}>Nuestra historia y filosofía</span>
                <div className={Styles.imgNosContenedor}>
                    {/* Los archivos de /public se referencian desde la raíz: "/img/..." */}
                    <img
                        className={Styles.historia}
                        src="/img/barista.jpg"
                        alt="Barista de Bruma preparando un café en la barra"
                        loading="lazy"
                    />
                    <figure className={Styles.contenedorCardImg}>
                        <blockquote>
                            <p>
                                “El tiempo que dedicamos a cada extracción es el que vos te
                                regalás en el día.”
                            </p>
                        </blockquote>
                        <figcaption>Laboratorio Bruma</figcaption>
                    </figure>
                </div>
                <div>
                    <h2 id="nosotros-titulo" className={Styles.tituloNosotros}>
                        Más que café, un momento propio
                    </h2>
                    <p className={Styles.descripcionNosotros}>
                        Creemos que disfrutar un buen café empieza mucho antes del primer
                        sorbo: en la elección del origen directo, en la curva térmica de
                        nuestro tostador y en ese instante matutino en el que decidís
                        hacerlo tuyo.
                    </p>

                    <p className={Styles.descripcionNosotros}>
                        Colaboramos con pequeños productores de Colombia, Etiopía y Brasil,
                        priorizando cosechas agroecológicas y perfiles sensoriales nítidos.
                        Sin atajos industriales, honrando el carácter de cada suelo.
                    </p>
                    <div className={Styles.containercard}>
                        {VALORES.map(({ titulo, texto }) => (
                            <article key={titulo} className={Styles.cardnosotros}>
                                <h3>{titulo}</h3>
                                <p>{texto}</p>
                            </article>
                        ))}
                    </div>
                    <Link to={Routes.nosotros} className={Styles.buttonmas}>
                        Conocé Bruma
                    </Link>
                </div>
            </section>

            {/*Guia */}

            <section className={Styles.guia} aria-labelledby="guia-titulo">
                <section className={Styles.guiaContenedor}>


                    <span className={Styles.guiaEtiqueta}>

                        Guía de degustación · Suscripciones
                    </span>

                    <h2 id="guia-titulo" className={Styles.guiaTitulo}>
                        Encontrá tu próximo café favorito
                    </h2>

                    <p className={Styles.guiaTexto}>
                        Guías de molienda según tu cafetera, notas de cata detalladas y
                        suscripciones mensuales con envíos programados a tu medida.
                    </p>

                    <div className={Styles.guiaAcciones}>
                        <Link to={Routes.productos} className={Styles.botonPrincipal}>
                            Explorar todos los cafés
                        </Link>
                        <Link to={Routes.suscripcion} className={Styles.botonSecundario}>
                            Armar mi suscripción
                        </Link>
                    </div>

                </section>
            </section>

            {/* Contacto */}

            <section className={Styles.contactoHome} aria-labelledby="contacto-titulo">
                <div className={Styles.contactoContainer}>

                    {/* Columna izquierda: información */}
                    <div className={Styles.contactoInfo}>
                        <span className={Styles.contactoEtiqueta}>Atención y curaduría</span>

                        <h2 id="contacto-titulo" className={Styles.contactoTitulo}>
                            Hablemos de café
                        </h2>

                        <p className={Styles.contactoTexto}>
                            ¿Tenés dudas sobre el punto de molienda para tu prensa francesa,
                            o querés asesoría sobre qué origen se adapta mejor a tu paladar?
                            Estamos para orientarte.
                        </p>

                        {/* Descarga la imagen a public/img: los links de Google caducan */}
                        <img
                            className={Styles.contactoImagen}
                            src="/img/contacto.jpg"
                            alt="Cafetera sifón de vidrio en barra de cafetería"
                            loading="lazy"
                        />

                        <address className={Styles.contactoCard}>
                            <span className={Styles.contactoIcono}><IconoUbicacion /></span>
                            <div>
                                <p className={Styles.contactoCardTitulo}>Tostaduría & Barra</p>
                                <p className={Styles.contactoCardTexto}>Calle 1234, Villa Urquiza</p>
                                <p className={Styles.contactoCardNota}>Mar a Dom • 08:30 a 19:30 hs</p>
                            </div>
                        </address>

                        <address className={Styles.contactoCard}>
                            <span className={Styles.contactoIcono}><IconoCorreo /></span>
                            <div>
                                <p className={Styles.contactoCardTitulo}>Contacto directo</p>
                                <p className={Styles.contactoCardTexto}>
                                    <a href="mailto:hola@brumacafe.com.ar">hola@brumacafe.com.ar</a>
                                </p>
                                <p className={Styles.contactoCardNota}>
                                    <a href="tel:+541148992310">+54 11 4899-2310</a>
                                </p>
                            </div>
                        </address>
                    </div>

                    {/* Columna derecha: formulario */}
                    <form
                        className={Styles.contactoForm}
                        onSubmit={manejarContacto}
                        onChange={() => enviado && setEnviado(false)}
                    >
                        <h3 className={Styles.contactoFormTitulo}>Enviános un mensaje</h3>
                        <p className={Styles.contactoFormTexto}>
                            Te responderemos durante el día con sugerencias personalizadas de cata.
                        </p>

                        <div className={Styles.contactoCampo}>
                            <label className={Styles.contactoLabel} htmlFor="contacto-nombre">
                                Nombre completo <span aria-hidden="true">*</span>
                            </label>
                            <input
                                className={Styles.contactoInput}
                                type="text"
                                id="contacto-nombre"
                                name="nombre"
                                placeholder="Tu nombre"
                                autoComplete="name"
                                required
                            />
                        </div>

                        <div className={Styles.contactoCampo}>
                            <label className={Styles.contactoLabel} htmlFor="contacto-email">
                                Correo electrónico <span aria-hidden="true">*</span>
                            </label>
                            <input
                                className={Styles.contactoInput}
                                type="email"
                                id="contacto-email"
                                name="email"
                                placeholder="tuemail@ejemplo.com"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className={Styles.contactoCampo}>
                            <label className={Styles.contactoLabel} htmlFor="contacto-metodo">
                                Método de extracción predilecto (opcional)
                            </label>
                            <select
                                className={Styles.contactoInput}
                                id="contacto-metodo"
                                name="metodo"
                                defaultValue=""
                            >
                                <option value="">Seleccioná una opción</option>
                                {METODOS.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>

                        <div className={Styles.contactoCampo}>
                            <label className={Styles.contactoLabel} htmlFor="contacto-mensaje">
                                Mensaje o consulta <span aria-hidden="true">*</span>
                            </label>
                            <textarea
                                className={`${Styles.contactoInput} ${Styles.contactoTextarea}`}
                                id="contacto-mensaje"
                                name="mensaje"
                                placeholder="¿En qué podemos acompañarte?"
                                required
                            />
                        </div>

                        <button className={Styles.contactoButton} type="submit">
                            Enviar mensaje
                            <IconoEnviar />
                        </button>

                        {enviado && (
                            <p className={Styles.contactoEnviado} role="status">
                                ¡Gracias! Recibimos tu consulta y te respondemos durante el día.
                            </p>
                        )}
                    </form>

                </div>
            </section>

        </>
    );
}