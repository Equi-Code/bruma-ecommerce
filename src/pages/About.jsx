import { Link } from 'react-router-dom'

import Styles from '../css/About.module.css'

const RUTAS = {
    productos: '/productos',
    contacto: '/contacto',
}

// Textos de ejemplo: reemplázalos por la historia real de BRUMA
const PASOS = [
    {
        titulo: 'Origen',
        texto: 'Seleccionamos granos de especialidad de productores con prácticas cuidadas.',
    },
    {
        titulo: 'Tostado',
        texto: 'Tostamos en lotes chicos para resaltar las notas propias de cada origen.',
    },
    {
        titulo: 'Taza',
        texto: 'Probamos cada lote antes de ofrecerlo, para que llegue a tu casa como lo imaginamos.',
    },
]

export default function Nosotros() {
    return (
        <main>

            {/* Encabezado */}
            <header className={Styles.encabezado}>
                <span className="eyebrow">Nosotros</span>
                <h1 className={Styles.titulo}>Café que se toma su tiempo</h1>
                <p className="lead">
                    BRUMA nació de una idea simple: un buen café no necesita apuro.
                    Elegimos, tostamos y servimos con la misma paciencia.
                </p>
            </header>

            {/* Historia + proceso */}
            <section className={Styles.historia} aria-labelledby="historia-titulo">
                <div>
                    <h2 id="historia-titulo" className={Styles.historiaTitulo}>
                        Nuestra historia
                    </h2>
                    <p className={Styles.parrafo}>
                        Empezamos como un grupo de amigos obsesionados con la taza perfecta.
                        Probamos orígenes, ajustamos tostados y compartimos el resultado con
                        quienes pasaban por casa.
                    </p>
                    <p className={Styles.parrafo}>
                        Hoy seguimos trabajando igual: lotes pequeños, productores que
                        conocemos y una regla que no negociamos, que el café llegue fresco.
                    </p>
                </div>

                <ol className={Styles.pasos} aria-label="Cómo trabajamos">
                    {PASOS.map(({ titulo, texto }, i) => (
                        <li key={titulo} className={Styles.paso}>
                            <span className={Styles.pasoNumero}>0{i + 1}</span>
                            <div>
                                <h3 className={Styles.pasoTitulo}>{titulo}</h3>
                                <p className={Styles.pasoTexto}>{texto}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Llamado a la acción */}
            <section className={Styles.cta} aria-labelledby="cta-titulo">
                <h2 id="cta-titulo" className={Styles.ctaTitulo}>¿Probamos un café juntos?</h2>
                <p className={Styles.ctaTexto}>
                    Elige tu origen favorito o escríbenos si no sabes por dónde empezar.
                </p>
                <div className={Styles.acciones}>
                    <Link to={RUTAS.productos} className="hero-button">Ver cafés</Link>
                    <Link to={RUTAS.contacto} className={Styles.botonSecundario}>Contacto</Link>
                </div>
            </section>

        </main>
    )
}