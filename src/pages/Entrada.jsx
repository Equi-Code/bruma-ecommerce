import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/Entrada.module.css';
import cafeBruma from '../assets/cafeBruma.png'; // import: la ruta "/src/assets/..." no existe en producción

/* Hilos de vapor. Cada uno sube, se ensancha, se desvanece y se mece de lado a lado.
   x / ancho: posición y ancho dentro de la zona de vapor (en %)
   dur / delay: duración y desfase (negativo = ya empieza a mitad de recorrido)
   deriva: cuánto se mece hacia los costados (en % de su propio ancho) */
const HILOS_DE_VAPOR = [
    { x: '8%', ancho: '42%', dur: '6.5s', delay: '-0.5s', deriva: '22%' },
    { x: '30%', ancho: '50%', dur: '7.5s', delay: '-3.2s', deriva: '-18%' },
    { x: '52%', ancho: '38%', dur: '6s', delay: '-1.8s', deriva: '26%' },
    { x: '18%', ancho: '34%', dur: '8s', delay: '-5.5s', deriva: '-24%' },
    { x: '44%', ancho: '46%', dur: '7s', delay: '-4.1s', deriva: '16%' },
    { x: '60%', ancho: '30%', dur: '6.8s', delay: '-2.6s', deriva: '-20%' },
];

/* A dónde lleva la entrada. Tu Home está en "/": si la entrada vive en "/", mueve el Home a "/inicio" */
const RUTA_INICIO = '/inicio';

/* Duración de la transición de salida (ms): debe coincidir con la animación .cortina del CSS */
const DURACION_SALIDA = 900;

export default function Entrada() {
    const navigate = useNavigate();
    const [saliendo, setSaliendo] = useState(false);
    const yaNavego = useRef(false);
    const temporizador = useRef(null);

    // Navega una sola vez, aunque lleguen dos avisos (fin de animación y respaldo)
    const irAInicio = () => {
        if (yaNavego.current) return;
        yaNavego.current = true;
        // El estado le avisa al Home que viene de la entrada, para que se "revele" con niebla
        navigate(RUTA_INICIO, { state: { desdeEntrada: true } });
    };

    useEffect(() => () => clearTimeout(temporizador.current), []);

    const manejarClick = (e) => {
        // Ctrl/Cmd + clic, clic del medio, etc.: el enlace se comporta como siempre
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        e.preventDefault();
        if (saliendo) return;

        const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducirMovimiento) {
            irAInicio();
            return;
        }

        setSaliendo(true);
        // Respaldo por si el navegador no dispara "animationend"
        temporizador.current = setTimeout(irAInicio, DURACION_SALIDA + 400);
    };

    return (
        <main
            className={`${styles.entrada} ${saliendo ? styles.saliendo : ''}`}
            aria-busy={saliendo}
        >
            <div className={styles.fondo} aria-hidden="true" />

            <div className={styles.marco}>
                {/* La escena tiene la proporción de la foto y escala con ella:
            el vapor queda siempre sobre la taza, sin importar el tamaño de la pantalla */}
                <div className={styles.escena}>
                    <img
                        className={styles.imagen}
                        src={cafeBruma}
                        alt="Taza de café humeante sobre una mesa de madera, junto a un paquete de café BRUMA"
                    />

                    <div className={styles.vapor} aria-hidden="true">
                        {HILOS_DE_VAPOR.map(({ x, ancho, dur, delay, deriva }, i) => (
                            <span
                                key={i}
                                className={styles.humo}
                                style={{
                                    '--x': x,
                                    '--ancho-humo': ancho,
                                    '--dur': dur,
                                    '--delay': delay,
                                    '--deriva': deriva,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.sombra} aria-hidden="true" />
            </div>

            <div className={styles.contenido}>
                <span className={styles.etiqueta}>CAFÉ DE ESPECIALIDAD</span>

                {/* Sin espacios entre letras: el espaciado lo da el CSS (los lectores de pantalla leen "BRUMA") */}
                <h1 className={styles.logo}>BRUMA</h1>

                <span className={styles.linea} aria-hidden="true" />

                <p className={styles.frase}>El ritual empieza acá.</p>

                <Link to={RUTA_INICIO} className={styles.boton} onClick={manejarClick}>
                    Entrar a BRUMA
                    <span aria-hidden="true">↗</span>
                </Link>
            </div>

            <span className={styles.pie}>CAFÉ · ORIGEN · EXPERIENCIA</span>

            {/* Niebla de salida: cubre la pantalla y, al terminar, se navega al Home */}
            <div className={styles.cortina} aria-hidden="true" onAnimationEnd={irAInicio} />
        </main>
    );
}