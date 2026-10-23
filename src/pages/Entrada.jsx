import { Link } from 'react-router-dom';
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

export default function Entrada() {
  return (
    <main className={styles.entrada}>
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

        {/* Verifica que esta ruta exista en tu <Routes>. Tu Home está en "/" */}
        <Link to="/inicio" className={styles.boton}>
          Entrar a BRUMA
          <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <span className={styles.pie}>CAFÉ · ORIGEN · EXPERIENCIA</span>
    </main>
  );
}