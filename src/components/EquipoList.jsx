import Equipo from "./Equipo";
import Styles from '../css/Footer.module.css';


export default function EquipoList({ equipo }) {

    return (
        <div className={Styles.footerTeam}>
            {
                equipo.map((miembro) => (
                    <Equipo
                        key={miembro.id}
                        nombre={miembro.nombre}
                        email={miembro.email}
                        puesto={miembro.puesto}
                        imagen={miembro.imagen}
                    />
                ))
            }
        </div>
    );
}