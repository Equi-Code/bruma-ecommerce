


export default function About() {
    return (

        <section className={Styles.about}>


            <div className={Styles.aboutContent}>

            <img className={Styles.aboutImage} src="https://www.lafazenda.com.ar/wp-content/uploads/2025/01/Capsulas-nespresso-todas.webp" alt="Imagen de café" />

            <div className={Styles.aboutContainer}>
                <h2 className={Styles.aboutTitle}>Sobre Nosotros</h2>
                <p className={Styles.aboutDescription}>
                    En BRUMA, nos apasiona el café de especialidad. Nos dedicamos a ofrecer una experiencia única a nuestros clientes, seleccionando cuidadosamente los mejores granos de café y brindando un servicio excepcional. Nuestro objetivo es compartir nuestra pasión por el café y crear momentos memorables para todos los amantes del café.
                </p>
            </div>

            </div>

        </section>

        );
    }