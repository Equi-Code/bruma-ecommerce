
import { Link } from 'react-router-dom';
import Styles from '../css/ClubBruma.module.css';

const beneficios = [
    {
        icono: '♧',
        titulo: 'Cafés de Origen Trazables',
        descripcion: 'Seleccionados directamente en fincas de altura de América Latina.',
    },
    {
        icono: '♨',
        titulo: 'Tueste Bajo Demanda',
        descripcion: 'Perfiles térmicos óptimos para asegurar frescura.',
    },
    {
        icono: '∞',
        titulo: 'Válvula Desgasificadora',
        descripcion: 'Empaque que protege los aceites esenciales aromáticos.',
    },
    {
        icono: '↗',
        titulo: 'Envíos a Todo el País',
        descripcion: 'Café en tu puerta con envío a todo el país.',
    },
];

export default function ClubBruma() {
    return (
        <section className={Styles.club} aria-labelledby="club-titulo">
            <div className={Styles.contenido}>
                <div className={Styles.imagenContenedor}>
                    <img
                        className={Styles.imagen}
                        src="/img/bruma-club-cafe.png"
                        alt="Preparación de café de especialidad en un ambiente cálido y natural"
                        loading="lazy"
                    />
                </div>

                <div className={Styles.texto}>
                    <p className={Styles.etiqueta}>
                        Completá tu experiencia / Club BRUMA
                    </p>

                    <h2 id="club-titulo" className={Styles.titulo}>
                        Café fresco en tu puerta, cada mes.
                    </h2>

                    <p className={Styles.descripcion}>
                        Descubrí cafés de especialidad seleccionados para
                        acompañar tus rituales, con perfiles únicos y toda
                        la frescura de un buen tueste.
                    </p>

                    <blockquote className={Styles.cita}>
                        <p>
                            “El café perfecto no es casualidad; es el diálogo
                            constante entre el origen y la paciencia del calor.”
                        </p>
                        <cite>Una filosofía BRUMA</cite>
                    </blockquote>

                    <div className={Styles.acciones}>
                        <Link
                            to="/productos"
                            className={Styles.botonPrincipal}
                        >
                            Descubrir cafés <span aria-hidden="true">→</span>
                        </Link>

                        <a
                            href="#beneficios-club"
                            className={Styles.botonSecundario}
                        >
                            Ver beneficios del club
                        </a>
                    </div>
                </div>
            </div>

            <div
                id="beneficios-club"
                className={Styles.beneficios}
            >
                {beneficios.map((beneficio) => (
                    <article
                        className={Styles.beneficio}
                        key={beneficio.titulo}
                    >
                        <span
                            className={Styles.icono}
                            aria-hidden="true"
                        >
                            {beneficio.icono}
                        </span>

                        <h3>{beneficio.titulo}</h3>
                        <p>{beneficio.descripcion}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
