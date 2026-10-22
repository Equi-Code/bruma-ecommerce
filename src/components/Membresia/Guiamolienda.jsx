import Styles from '../../css/ProductosExtras.module.css'

/* Textos de la guía. La barra de granulometría se calcula sola a partir de las micras. */
const MAX_MICRAS = 1200

const PASOS = [
    {
        paso: '01',
        nivel: 'Fina',
        tiempo: '25 - 30 seg',
        titulo: 'Espresso & Moka',
        texto: 'Textura similar a la sal de mesa refinada. Alta resistencia que produce crema densa y aceites concentrados bajo 9 bares de presión.',
        micras: [200, 400],
        icono: 'espresso',
    },
    {
        paso: '02',
        nivel: 'Media',
        tiempo: '2,5 - 3,5 min',
        titulo: 'V60, Chemex & Aeropress',
        texto: 'Textura de arena marina. Permite que el flujo constante de agua filtre notas florales y acidez limpia sin amargor por sobreextracción.',
        micras: [500, 800],
        icono: 'gota',
    },
    {
        paso: '03',
        nivel: 'Gruesa',
        tiempo: '4 - 5 min / 16 h',
        titulo: 'Prensa Francesa & Cold Brew',
        texto: 'Textura de sal marina gruesa. Ideal para inmersión prolongada; evita que el filtro metálico deje sedimentos y favorece un cuerpo aterciopelado.',
        micras: [900, 1200],
        icono: 'matraz',
    },
]

/* Iconos SVG inline (sin dependencias) */
function Icono({ children }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
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
    espresso: (
        <Icono>
            <path d="M10 2v2" />
            <path d="M14 2v2" />
            <path d="M6 2v2" />
            <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
        </Icono>
    ),
    gota: (
        <Icono>
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </Icono>
    ),
    matraz: (
        <Icono>
            <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
            <path d="M8.5 2h7" />
            <path d="M7 16h10" />
        </Icono>
    ),
}

export default function GuiaMolienda() {
    return (
        <section className={Styles.guia} aria-labelledby="guia-molienda-titulo">
            <div className={Styles.contenedor}>

                <header className={Styles.encabezado}>
                    <span className={Styles.etiqueta}>Guía de extracción</span>
                    <h2 id="guia-molienda-titulo" className={Styles.titulo}>
                        Calibración de molienda y método
                    </h2>
                    <p className={Styles.texto}>
                        El tamaño de la partícula define la tasa de extracción. Recomendamos
                        calibrar según el tiempo de contacto con el agua.
                    </p>
                </header>

                <ol className={Styles.pasos}>
                    {PASOS.map(({ paso, nivel, tiempo, titulo, texto, micras, icono }) => {
                        const [minimo, maximo] = micras

                        return (
                            <li key={paso} className={Styles.paso}>
                                <span className={Styles.pasoIcono}>{ICONOS[icono]}</span>

                                <div className={Styles.pasoMeta}>
                                    <span>Paso {paso} · {nivel}</span>
                                    <span className={Styles.pasoTiempo}>{tiempo}</span>
                                </div>

                                <h3 className={Styles.pasoTitulo}>{titulo}</h3>
                                <p className={Styles.pasoTexto}>{texto}</p>

                                <div className={Styles.granulo}>
                                    <div className={Styles.granuloTexto}>
                                        <span>Granulometría</span>
                                        <strong>{minimo} - {maximo} µm</strong>
                                    </div>
                                    <div
                                        className={Styles.granuloPista}
                                        role="img"
                                        aria-label={`Granulometría de ${minimo} a ${maximo} micrones`}
                                    >
                                        <div
                                            className={Styles.granuloRelleno}
                                            style={{ width: `${(maximo / MAX_MICRAS) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ol>

            </div>
        </section>
    )
}