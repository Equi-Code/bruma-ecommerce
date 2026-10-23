import { useState } from 'react'
import Styles from '../css/Contacto.module.css'

/* ⚠️ Datos tomados del diseño de referencia: reemplázalos por los reales de BRUMA */
const DATOS = {
    direccion: 'Gorriti 4820, Palermo Soho',
    ciudad: 'Ciudad Autónoma de Buenos Aires, Argentina',
    horario: 'Martes a Domingo: 08:30 a 19:30 hs',
    horarioNota: 'Lunes: cerrado por jornada de tueste y catas',
    email: 'hola@brumacafe.com.ar',
    telefono: '+54 11 4899-2310',
    telefonoLink: '+541148992310',
    whatsapp: '5491148992310',
    whatsappTexto: '+54 9 11 4899-2310',
    b2b: 'consultas@brumacafe.com.ar',
}

const URL_MAPA = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${DATOS.direccion}, ${DATOS.ciudad}`
)}`

const MOTIVOS = [
    { valor: 'molienda', label: 'Dudas sobre molienda y origen' },
    { valor: 'pedidos', label: 'Pedidos especiales y suscripciones' },
    { valor: 'mayorista', label: 'Ventas mayoristas para cafeterías' },
    { valor: 'visita', label: 'Visita al laboratorio de tueste' },
    { valor: 'otro', label: 'Otro' },
]

const METODOS = [
    { valor: 'espresso', label: 'Espresso (máquina de casa o comercial)' },
    { valor: 'v60', label: 'V60 / filtrado manual por goteo' },
    { valor: 'prensa', label: 'Prensa francesa (inmersión)' },
    { valor: 'moka', label: 'Moka / cafetera italiana' },
    { valor: 'capsulas', label: 'Cápsulas reutilizables' },
]

/* ⚠️ Respuestas de ejemplo del diseño: confirma que sean ciertas para tu negocio */
const FAQS = [
    {
        pregunta: '¿Cómo sé qué tipo de molienda elegir para mi cafetera?',
        respuesta: (
            <>
                Recomendamos siempre moler al momento de preparar para preservar los aromas
                volátiles. Si no tenés molino en casa, indicanos al hacer tu pedido el método
                exacto: <strong>fina</strong> para espresso y moka, <strong>media</strong> para
                V60, Kalita y cafeteras de goteo, o <strong>gruesa</strong> para prensa francesa
                y cold brew.
            </>
        ),
    },
    {
        pregunta: '¿Con qué frecuencia tuestan el café?',
        respuesta: (
            <>
                Tostamos en pequeños lotes todos los <strong>martes</strong> y despachamos dentro
                de las 48 horas posteriores. Así recibís los granos dentro de la ventana óptima
                de desgasificación (entre 5 y 20 días de reposo después del tueste).
            </>
        ),
    },
    {
        pregunta: '¿Hacen envíos a todo el país?',
        respuesta: (
            <>
                Sí, enviamos a toda la Argentina por paquetería express con código de seguimiento
                en tiempo real. En CABA también ofrecemos envíos en el día en moto y retiro sin
                cargo por nuestro local en {DATOS.direccion.split(',')[0]}.
            </>
        ),
    },
    {
        pregunta: '¿Tienen opciones para cafeterías, restaurantes y oficinas?',
        respuesta: (
            <>
                Disponemos de un programa corporativo y mayorista con lista de precios por
                volumen, asesoría técnica de extracción en barra, mantenimiento preventivo de
                máquinas de espresso y capacitaciones para tu equipo de baristas.
            </>
        ),
    },
]

/* Iconos SVG inline (sin dependencias) */
function Icono({ children, size = 20 }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
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
    ubicacion: (
        <Icono>
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </Icono>
    ),
    reloj: (
        <Icono>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </Icono>
    ),
    correo: (
        <Icono size={18}>
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </Icono>
    ),
    telefono: (
        <Icono size={18}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </Icono>
    ),
    chat: (
        <Icono size={18}>
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </Icono>
    ),
    flecha: (
        <Icono size={16}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </Icono>
    ),
    navegar: (
        <Icono size={16}>
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </Icono>
    ),
    enviar: (
        <Icono size={18}>
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </Icono>
    ),
    check: (
        <Icono>
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
        </Icono>
    ),
    chevron: (
        <Icono>
            <path d="m6 9 6 6 6-6" />
        </Icono>
    ),
}

export default function Contacto() {
    const [enviado, setEnviado] = useState(false)
    const [faqAbierta, setFaqAbierta] = useState(null)

    const manejarEnvio = (e) => {
        e.preventDefault()
        const datos = Object.fromEntries(new FormData(e.currentTarget))
        console.log('Consulta de contacto:', datos) // TODO: enviar a tu backend o servicio de email
        e.currentTarget.reset()
        setEnviado(true)
    }

    return (
        <main>
            <div className={Styles.pagina}>

                {/* ============ Encabezado ============ */}
                <header className={Styles.encabezado}>
                    <span className={Styles.etiqueta}>Estamos para escucharte</span>
                    <h1 className={Styles.titulo}>Hablemos de café</h1>
                    <p className={Styles.descripcion}>
                        ¿Tenés preguntas sobre perfiles de tueste, asesoría para tu cafetería o querés
                        visitarnos en nuestro tostadero? Escribinos o acercate a nuestra barra.
                    </p>
                </header>

                <div className={Styles.grid}>

                    {/* ============ Información ============ */}
                    <div className={Styles.info}>

                        <figure className={Styles.foto}>
                            <img
                                src="/img/contacto.jpg"
                                alt="Cafetera sifón de vidrio sobre la barra de la cafetería"
                                className={Styles.fotoImg}
                            />
                            <div className={Styles.fotoVelo} aria-hidden="true" />
                            <figcaption className={Styles.fotoPie}>
                                <span className={Styles.fotoEtiqueta}>Laboratorio y barra</span>
                                <span className={Styles.fotoTitulo}>Extracciones por sifón y filtro</span>
                            </figcaption>
                        </figure>

                        <div className={Styles.datos}>

                            <section className={Styles.bloque}>
                                <h2 className={Styles.bloqueEtiqueta}>Ubicación</h2>
                                <address className={Styles.fila}>
                                    <span className={Styles.icono}>{ICONOS.ubicacion}</span>
                                    <div>
                                        <p className={Styles.principal}>{DATOS.direccion}</p>
                                        <p className={Styles.secundario}>{DATOS.ciudad}</p>
                                    </div>
                                </address>
                            </section>

                            <section className={Styles.bloque}>
                                <h2 className={Styles.bloqueEtiqueta}>Horarios de barra</h2>
                                <div className={Styles.fila}>
                                    <span className={Styles.icono}>{ICONOS.reloj}</span>
                                    <div>
                                        <p className={Styles.principal}>{DATOS.horario}</p>
                                        <p className={Styles.nota}>{DATOS.horarioNota}</p>
                                    </div>
                                </div>
                            </section>

                            <section className={Styles.bloque}>
                                <h2 className={Styles.bloqueEtiqueta}>Contacto directo</h2>
                                <ul className={Styles.contactos}>
                                    <li className={Styles.fila}>
                                        <span className={Styles.icono}>{ICONOS.correo}</span>
                                        <a href={`mailto:${DATOS.email}`}>{DATOS.email}</a>
                                    </li>
                                    <li className={Styles.fila}>
                                        <span className={Styles.icono}>{ICONOS.telefono}</span>
                                        <a href={`tel:${DATOS.telefonoLink}`}>{DATOS.telefono}</a>
                                    </li>
                                    <li className={Styles.fila}>
                                        <span className={Styles.icono}>{ICONOS.chat}</span>
                                        <a
                                            href={`https://wa.me/${DATOS.whatsapp}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            WhatsApp directo ({DATOS.whatsappTexto})
                                        </a>
                                    </li>
                                </ul>
                            </section>

                            <div className={Styles.b2b}>
                                <h2 className={Styles.bloqueEtiqueta}>B2B y cafeterías de tercera ola</h2>
                                <p className={Styles.secundario}>
                                    Suministro de microlotes seleccionados, calibración de equipamiento
                                    y catas mensuales de equipo.
                                </p>
                                <a href={`mailto:${DATOS.b2b}`} className={Styles.enlaceFlecha}>
                                    {DATOS.b2b}
                                    {ICONOS.flecha}
                                </a>
                            </div>
                        </div>

                        <a
                            href={URL_MAPA}
                            className={Styles.mapa}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className={Styles.mapaChip}>
                                {ICONOS.navegar}
                                Ver en Google Maps
                            </span>
                        </a>
                    </div>

                    {/* ============ Formulario ============ */}
                    <form
                        className={Styles.formulario}
                        onSubmit={manejarEnvio}
                        onChange={() => enviado && setEnviado(false)}
                    >
                        <div className={Styles.formularioEncabezado}>
                            <span className={Styles.bloqueEtiqueta}>Atención personalizada</span>
                            <h2 className={Styles.formularioTitulo}>Enviános tu consulta</h2>
                            <p className={Styles.secundario}>
                                Completá los datos y nuestro equipo de tostadores o baristas
                                responderá dentro de las 24 horas hábiles.
                            </p>
                        </div>

                        <div className={Styles.dosColumnas}>
                            <div className={Styles.campo}>
                                <label className={Styles.label} htmlFor="contacto-nombre">
                                    Nombre y apellido <span aria-hidden="true">*</span>
                                </label>
                                <input
                                    className={Styles.input}
                                    id="contacto-nombre"
                                    name="nombre"
                                    type="text"
                                    placeholder="Tu nombre"
                                    autoComplete="name"
                                    required
                                />
                            </div>

                            <div className={Styles.campo}>
                                <label className={Styles.label} htmlFor="contacto-email">
                                    Correo electrónico <span aria-hidden="true">*</span>
                                </label>
                                <input
                                    className={Styles.input}
                                    id="contacto-email"
                                    name="email"
                                    type="email"
                                    placeholder="tu@correo.com"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className={Styles.dosColumnas}>
                            <div className={Styles.campo}>
                                <label className={Styles.label} htmlFor="contacto-telefono">
                                    Teléfono / WhatsApp <span className={Styles.opcional}>(opcional)</span>
                                </label>
                                <input
                                    className={Styles.input}
                                    id="contacto-telefono"
                                    name="telefono"
                                    type="tel"
                                    placeholder="+54 11 0000 0000"
                                    autoComplete="tel"
                                />
                            </div>

                            <div className={Styles.campo}>
                                <label className={Styles.label} htmlFor="contacto-motivo">
                                    Motivo de tu consulta <span aria-hidden="true">*</span>
                                </label>
                                <select
                                    className={`${Styles.input} ${Styles.select}`}
                                    id="contacto-motivo"
                                    name="motivo"
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled>Seleccioná un motivo…</option>
                                    {MOTIVOS.map((m) => (
                                        <option key={m.valor} value={m.valor}>{m.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={Styles.campo}>
                            <label className={Styles.label} htmlFor="contacto-metodo">
                                Método de extracción predilecto <span className={Styles.opcional}>(opcional)</span>
                            </label>
                            <select
                                className={`${Styles.input} ${Styles.select}`}
                                id="contacto-metodo"
                                name="metodo"
                                defaultValue=""
                            >
                                <option value="">Seleccioná una opción…</option>
                                {METODOS.map((m) => (
                                    <option key={m.valor} value={m.valor}>{m.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className={Styles.campo}>
                            <label className={Styles.label} htmlFor="contacto-mensaje">
                                Mensaje o detalle del proyecto <span aria-hidden="true">*</span>
                            </label>
                            <textarea
                                className={`${Styles.input} ${Styles.textarea}`}
                                id="contacto-mensaje"
                                name="mensaje"
                                rows="4"
                                placeholder="Contanos qué café estás buscando, tipo de grano, perfiles preferidos o requerimientos para tu espacio…"
                                required
                            />
                        </div>

                        <label className={Styles.checkbox}>
                            <input type="checkbox" name="novedades" />
                            <span>
                                Quiero recibir notas sobre microlotes recién llegados, fechas de tueste
                                fresco y accesos previos a catas abiertas.
                            </span>
                        </label>

                        {enviado && (
                            <p className={Styles.exito} role="status">
                                {ICONOS.check}
                                ¡Mensaje recibido! Nos contactaremos a la brevedad.
                            </p>
                        )}

                        <button type="submit" className={Styles.boton}>
                            Enviar mensaje
                            {ICONOS.enviar}
                        </button>
                    </form>

                </div>

                {/* ============ Preguntas frecuentes ============ */}
                <section className={Styles.faq} aria-labelledby="faq-titulo">
                    <header className={Styles.faqEncabezado}>
                        <span className={Styles.etiqueta}>Consultas habituales</span>
                        <h2 id="faq-titulo" className={Styles.faqTituloSeccion}>Preguntas frecuentes</h2>
                        <p className={Styles.secundario}>
                            Todo lo que necesitás saber antes de adquirir nuestros orígenes o visitarnos.
                        </p>
                    </header>

                    <div className={Styles.faqLista}>
                        {FAQS.map(({ pregunta, respuesta }, i) => {
                            const abierta = faqAbierta === i

                            return (
                                <div
                                    key={pregunta}
                                    className={`${Styles.faqItem} ${abierta ? Styles.faqAbierto : ''}`}
                                >
                                    <h3 className={Styles.faqPregunta}>
                                        <button
                                            type="button"
                                            id={`faq-boton-${i}`}
                                            className={Styles.faqBoton}
                                            aria-expanded={abierta}
                                            aria-controls={`faq-panel-${i}`}
                                            onClick={() => setFaqAbierta(abierta ? null : i)}
                                        >
                                            <span>{pregunta}</span>
                                            <span className={Styles.faqIcono}>{ICONOS.chevron}</span>
                                        </button>
                                    </h3>

                                    <div
                                        id={`faq-panel-${i}`}
                                        role="region"
                                        aria-labelledby={`faq-boton-${i}`}
                                        className={Styles.faqPanel}
                                    >
                                        <div className={Styles.faqPanelInterno}>
                                            <p className={Styles.faqRespuesta}>{respuesta}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

            </div>
        </main>
    )
}