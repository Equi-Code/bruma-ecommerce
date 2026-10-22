import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Styles from '../css/Header.module.css';
import { useCart } from './Cart/UseCart';
import { useFavoritos } from '../utils/useFavoritos';

const LINKS = [
    { to: '/', label: 'Inicio', end: true }, // "end": que "/" no quede activo en todas las rutas
    { to: '/productos', label: 'Productos' },
    { to: '/nosotros', label: 'Sobre Nosotros' },
    { to: '/contacto', label: 'Contacto' },
];

/* Iconos SVG inline: sin dependencias externas */
function Icono({ children, size = 22 }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
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
    );
}


const IconoCorazon = () => (
    <Icono>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </Icono>
);


const IconoUsuario = () => (
    <Icono>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </Icono>
);

const IconoBolsa = () => (
    <Icono>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </Icono>
);

/* cantidadCarrito: pásala desde tu estado/contexto del carrito */
export default function Header() {

    const { getCartQuantity } = useCart();
    const { cantidadFavoritos } = useFavoritos();
    const totalItems = getCartQuantity();

    const [menuOpen, setMenuOpen] = useState(false);
    const [conScroll, setConScroll] = useState(false);
    const { pathname } = useLocation();

    // En el Home el header es transparente sobre el hero y se vuelve sólido al hacer scroll
    const transparente = pathname === '/' && !conScroll && !menuOpen;

    useEffect(() => {
        const alHacerScroll = () => setConScroll(window.scrollY > 24);

        alHacerScroll();
        window.addEventListener('scroll', alHacerScroll, { passive: true });
        return () => window.removeEventListener('scroll', alHacerScroll);
    }, []);

    const alternarMenu = () => setMenuOpen((abierto) => !abierto);
    const cerrarMenu = () => setMenuOpen(false);

    // Escape cierra el menú móvil
    useEffect(() => {
        if (!menuOpen) return;

        const alPresionar = (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };

        document.addEventListener('keydown', alPresionar);
        return () => document.removeEventListener('keydown', alPresionar);
    }, [menuOpen]);

    const claseLink = ({ isActive }) =>
        [Styles.navLink, isActive && Styles.navLinkActive].filter(Boolean).join(' ');

    return (
        <header className={`${Styles.header} ${transparente ? Styles.headerTransparente : ''}`}>

            <div className={Styles.contenedor}>

                {/* Logo: un enlace al inicio. No es un h1: el h1 de la página va en el contenido */}
                <Link to="/" className={Styles.logo} onClick={cerrarMenu} aria-label="BRUMA, café de especialidad. Ir al inicio">
                    <span className={Styles.logoTitulo}>BRUMA</span>
                    <span className={Styles.logoSubtitulo}>Café de especialidad</span>
                </Link>

                {/* Navegación principal */}
                <nav
                    id="menu-principal"
                    aria-label="Principal"
                    className={`${Styles.nav} ${menuOpen ? Styles.navOpen : ''}`}
                >
                    {LINKS.map(({ to, label, end }) => (
                        <NavLink key={to} to={to} end={end} className={claseLink} onClick={cerrarMenu}>
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Acciones */}
                <div className={Styles.acciones}>


                    <Link
                        to="/favoritos"
                        className={Styles.iconoBoton}
                        aria-label={
                            cantidadFavoritos > 0
                                ? `Favoritos, ${cantidadFavoritos} cafés guardados`
                                : 'Mis favoritos'
                        }
                        onClick={cerrarMenu}
                    >
                        <IconoCorazon />
                        {cantidadFavoritos > 0 && (
                            <span className={Styles.badge} aria-hidden="true">
                                {cantidadFavoritos}
                            </span>
                        )}
                    </Link>





                    <Link to="/login" className={Styles.iconoBoton} aria-label="Ingresar" onClick={cerrarMenu}>
                        <IconoUsuario />
                    </Link>

                    <Link
                        to="/carrito"
                        className={Styles.iconoBoton}
                        aria-label={totalItems > 0 ? `Carrito, ${totalItems} productos` : 'Carrito'}
                        onClick={cerrarMenu}
                    >
                        <IconoBolsa />
                        {totalItems > 0 && (
                            <span className={Styles.badge} aria-hidden="true">{totalItems}</span>
                        )}
                    </Link>

                    {/* Botón hamburguesa (solo en móvil) */}
                    <button
                        type="button"
                        className={Styles.menuButton}
                        onClick={alternarMenu}
                        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={menuOpen}
                        aria-controls="menu-principal"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

            </div>

        </header>
    );
}