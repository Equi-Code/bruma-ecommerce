import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import Styles from '../css/Footer.module.css';
import EquipoListContainer from './Equipo/EquipoContainer';

// Mismos nombres y rutas que el header
const LINKS = [
    { to: '/', label: 'Inicio' },
    { to: '/productos', label: 'Productos' },
    { to: '/nosotros', label: 'Nosotros' },
    { to: '/contacto', label: 'Contacto' },
];

// ⚠️ Reemplaza los "#" por los perfiles reales
const REDES = [
    { href: '#', label: 'Facebook', Icon: FaFacebookF },
    { href: '#', label: 'Instagram', Icon: FaInstagram },
    { href: '#', label: 'X (Twitter)', Icon: FaXTwitter },
];

const LEMA = 'Tostado de origen • Buenos Aires';

/* mostrarEquipo: muestra la sección del equipo sobre el pie.
   Pásalo en false desde el Layout en las páginas donde no quieras verlo. */
export default function Footer({ mostrarEquipo = true }) {
    return (
        <footer className={Styles.footer}>

            <div className={Styles.contenedor}>

                {/* Equipo: el título va aquí; las tarjetas las dibuja EquipoListContainer.
                    Si ese componente ya muestra su propio título, quita uno de los dos. */}
                {mostrarEquipo && (
                    <section className={Styles.equipo} aria-labelledby="equipo-titulo">
                        <span className={Styles.etiqueta}>Equipo de maestros</span>
                        <h2 id="equipo-titulo" className={Styles.equipoTitulo}>
                            El alma de nuestro tostado
                        </h2>

                        <EquipoListContainer />
                    </section>
                )}

                {/* Marca, navegación y redes */}
                <div className={Styles.base}>

                    <Link to="/" className={Styles.logo} aria-label="BRUMA, café de especialidad. Ir al inicio">
                        <span className={Styles.logoTitulo}>BRUMA</span>
                        <span className={Styles.logoSubtitulo}>Café de especialidad</span>
                    </Link>

                    <nav className={Styles.navegacion} aria-label="Pie de página">
                        {LINKS.map(({ to, label }) => (
                            <Link key={to} to={to} className={Styles.enlace}>{label}</Link>
                        ))}
                    </nav>

                    <div className={Styles.redes}>
                        {REDES.map(({ href, label, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                className={Styles.redLink}
                                aria-label={label}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon className={Styles.redIcono} aria-hidden="true" />
                            </a>
                        ))}
                    </div>

                </div>

                {/* Legales */}
                <div className={Styles.legal}>
                    <p>© {new Date().getFullYear()} BRUMA. Todos los derechos reservados.</p>
                    <p className={Styles.lema}>{LEMA}</p>
                </div>

            </div>

        </footer>
    );
}