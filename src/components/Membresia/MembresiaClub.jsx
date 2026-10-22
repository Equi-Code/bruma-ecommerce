import { Link } from 'react-router-dom'
import Styles from '../../css/ProductosExtras.module.css'

/* ⚠️ Condiciones de ejemplo tomadas de tu diseño: confirma que sean las reales de tu negocio */
const PLAN = {
    precio: 9800,
    detalle: '2 bolsas de 250 g con perfil estacional',
    nota: 'Primer despacho dentro de 72 hs hábiles',
}

const BENEFICIOS = [
    { icono: 'check', texto: 'Cancelá cuando quieras' },
    { icono: 'envio', texto: 'Envío bonificado' },
    { icono: 'regalo', texto: 'Muestras exclusivas' },
]

function Icono({ children }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
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
    )
}

const ICONOS = {
    check: (
        <Icono>
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
        </Icono>
    ),
    envio: (
        <Icono>
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
        </Icono>
    ),
    regalo: (
        <Icono>
            <rect x="3" y="8" width="18" height="4" rx="1" />
            <path d="M12 8v13" />
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
        </Icono>
    ),
}

/* ruta: a dónde lleva "Suscribirme ahora". Cámbiala cuando exista la página de suscripciones. */
export default function MembresiaClub({ ruta = '/contacto' }) {
    return (
        <section className={Styles.clubBanda} aria-labelledby="club-titulo">
            <div className={Styles.club}>

                <div className={Styles.clubTexto}>
                    <p className={Styles.clubChip}>Membresía Bruma Club</p>

                    <h2 id="club-titulo" className={Styles.clubTitulo}>
                        Nunca te quedes sin café fresco recién tostado.
                    </h2>

                    <p className={Styles.clubDescripcion}>
                        Recibí cada mes micro-lotes de orígenes rotativos seleccionados por
                        nuestro tostador en la puerta de tu casa. Disfrutá de un{' '}
                        <strong>15% OFF garantizado</strong> y envíos bonificados en CABA y GBA.
                    </p>

                    <ul className={Styles.clubBeneficios}>
                        {BENEFICIOS.map(({ icono, texto }) => (
                            <li key={texto} className={Styles.clubBeneficio}>
                                {ICONOS[icono]}
                                {texto}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={Styles.plan}>
                    <p className={Styles.planEtiqueta}>Plan tostador recomendado</p>

                    <p className={Styles.planPrecio}>
                        ARS ${PLAN.precio.toLocaleString('es-AR')}
                    </p>
                    <p className={Styles.planPeriodo}>/ mes</p>
                    <p className={Styles.planDetalle}>{PLAN.detalle}</p>

                    <Link to={ruta} className={Styles.planBoton}>Suscribirme ahora</Link>

                    <p className={Styles.planNota}>{PLAN.nota}</p>
                </div>

            </div>
        </section>
    )
}