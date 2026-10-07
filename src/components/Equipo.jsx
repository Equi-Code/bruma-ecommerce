import Styles from '../css/Footer.module.css';

export default function Equipo({ nombre, email, puesto, imagen }) {

    return (


            <div className={Styles.teamCard}>
                <img className={Styles.imagen} src={imagen} alt={nombre} />
                <h3>{nombre}</h3>
                <p>{email}</p>
                <p>{puesto}</p>
            </div>


    );
}