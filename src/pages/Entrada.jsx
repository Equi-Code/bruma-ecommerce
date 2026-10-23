
import { Link } from 'react-router-dom';
import styles from '../css/Entrada.module.css';

export default function Entrada() {
  return (
    <main className={styles.entrada}>
      <div className={styles.fondo} aria-hidden="true" />

      <div className={styles.marco}>
        <img
          className={styles.imagen}
          src="/src/assets/cafeBruma.png"
          alt="Preparación de café de especialidad"
        />
        <div className={styles.sombra} />
      </div>

      
<div className={styles.vapor} aria-hidden="true">
  <span className={`${styles.humo} ${styles.humo1}`} />
  <span className={`${styles.humo} ${styles.humo2}`} />
  <span className={`${styles.humo} ${styles.humo3}`} />
</div>


      <div className={styles.contenido}>
        <span className={styles.etiqueta}>
          CAFÉ DE ESPECIALIDAD
        </span>

        <h1 className={styles.logo}>B R U M A</h1>

        <span className={styles.linea} />

        <p className={styles.frase}>
          El ritual empieza acá.
        </p>

        <Link to="/inicio" className={styles.boton}>
          Entrar a BRUMA
          <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <span className={styles.pie}>
        CAFÉ · ORIGEN · EXPERIENCIA
      </span>
    </main>
  );
}
