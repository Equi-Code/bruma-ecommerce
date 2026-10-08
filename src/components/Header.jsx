import { useState } from 'react';
import Styles from '../css/Header.module.css';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={Styles.header}>

            <div className={Styles.contenedor}>

                {/* Logo */}
                <div>
                    <h1 className={Styles.title}>BRUMA</h1>
                </div>

                {/* Botón hamburguesa */}
                <button
                    className={Styles.menuButton}
                    onClick={toggleMenu}
                    aria-label="Abrir menú"
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Navegación */}
                <nav
                    className={`${Styles.nav} ${menuOpen ? Styles.navOpen : ''
                        }`}
                >
                    <a href="#" className={Styles.navLink}>Inicio</a>
                    <a href="#" className={Styles.navLink}>Nosotros</a>
                    <a href="#" className={Styles.navLink}>Café</a>
                    <a href="#" className={Styles.navLink}>Contacto</a>
                    <a href="#" className={Styles.navLink}>Ingresar</a>

                    <a href="#" className={Styles.cart}>
                        🛒
                    </a>
                </nav>

            </div>

        </header>
    );
}