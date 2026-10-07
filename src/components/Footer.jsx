import Styles from '../css/Footer.module.css';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import EquipoListContainer from './EquipoContainer';

const LINKS = [
    { href: '#', label: 'Inicio' },
    { href: '#', label: 'Nosotros' },
    { href: '#', label: 'Café' },
    { href: '#', label: 'Contacto' },
    { href: '#', label: 'Ingresar' },
];

const REDES = [
    { href: '#', label: 'Facebook', Icon: FaFacebookF },
    { href: '#', label: 'Instagram', Icon: FaInstagram },
    { href: '#', label: 'X (Twitter)', Icon: FaXTwitter },
];

export default function Footer() {
    return (
        <footer className={Styles.footer}>

            <div className={Styles.contenedor}>

                <div className={Styles.footerLogo}>
                    <p className={Styles.footerTitle}>BRUMA</p>
                    <p className={Styles.footerSubtitle}>Café de especialidad</p>
                </div>

                <nav className={Styles.footerLinks} aria-label="Navegación del pie de página">
                    {LINKS.map(({ href, label }) => (
                        <a key={label} href={href} className={Styles.footerLink}>{label}</a>
                    ))}
                </nav>

                <div className={Styles.footerSocial}>
                    {REDES.map(({ href, label, Icon }) => (
                        <a
                            key={label}
                            href={href}
                            className={Styles.footerSocialLink}
                            aria-label={label}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon className={Styles.socialIcon} aria-hidden="true" />
                        </a>
                    ))}
                </div>

                <div>
                    <EquipoListContainer />
                </div>

                <p className={Styles.footerText}>
                    © {new Date().getFullYear()} BRUMA. Todos los derechos reservados.
                </p>

            </div>

        </footer>
    );
}