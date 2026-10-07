import Styles from '../css/Contacto.module.css'

export default function Contacto() {
    return (

        <section className={Styles.contacto}>

            <div className={Styles.contactoContainer}>

                <img
                    src="../src/assets/img/contacto.jpg"
                    alt="Café de especialidad BRUMA"
                    className={Styles.contactoImagen}
                />

                <div className={Styles.contactoContenido}>
                    <h2 className={Styles.contactoTitle}>Contacto</h2>
                    <p className={Styles.contactoDescription}>Si tienes alguna pregunta o consulta, no dudes en contactarnos.</p>
                    <p className={Styles.contactoDetail}>Email: info@tudominio.com</p>
                    <p className={Styles.contactoDetail}>Teléfono: +54 9 11 1234-5678</p>
                    <p className={Styles.contactoDetail}>Dirección: Calle Falsa 123, Ciudad, País</p>


                    <form className={Styles.contactoForm} action="">
                        <label className={Styles.contactoLabel} htmlFor="name">Nombre:</label>
                        <input className={Styles.contactoInput} type="text" id="name" name="name" required />
                        <label className={Styles.contactoLabel} htmlFor="email">Email:</label>
                        <input className={Styles.contactoInput} type="email" id="email" name="email" required />
                        <label className={Styles.contactoLabel} htmlFor="message">Mensaje:</label>
                        <textarea className={Styles.contactoTextarea} id="message" name="message" required></textarea>
                        <button className={Styles.contactoButton} type="submit">Enviar</button>
                    </form>

                </div>

            </div>

        </section>

    )
}