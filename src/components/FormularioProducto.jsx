import Styles from '../css/Formulario.module.css'


export default function FormularioProducto({ datosForm, manejarCambio, manejarEnvio }) {



    return (

        <form className={Styles.form} onSubmit={manejarEnvio}>
            <h3 className={Styles.tittleForm}>Agregar Nuevo Producto</h3>
            <div>
                <label className={Styles.label} htmlFor="nombre">Nombre del Producto</label>
                <input className={Styles.input} type="text" placeholder='Ej: Brasil' name="nombre "

                    value={datosForm.nombre}
                    onChange={manejarCambio}

                />
                <div>
                    <label className={Styles.label}>Precio:</label>
                    <input className={Styles.input} type="number" placeholder="Ej: 95"
                        name="precio" // Atributo clave
                        value={datosForm.precio}
                        onChange={manejarCambio}
                    />
                </div>

                <div>
                    <label className={Styles.label}>Tipo:</label>
                    <input className={Styles.input} type="text" placeholder="Ej: Torrado"
                        name="tipo" // Atributo clave
                        value={datosForm.tipo}
                        onChange={manejarCambio}

                    />
                </div>


                <div>
                    <label className={Styles.label}>Descripcion:</label>
                    <input className={Styles.input} type="text" placeholder="Ej: Surtido de 25 Cápsulas compatibles con Nespresso."
                        name="descripcion" // Atributo clave
                        value={datosForm.descripcion}
                        onChange={manejarCambio}

                    />
                </div>

                <div>
                    <label className={Styles.label}>Stock:</label>
                    <input className={Styles.input} type="number" placeholder="Ej: 5"


                        name="stock" // Atributo clave
                        value={datosForm.stock}
                        onChange={manejarCambio}



                    />
                </div>




                <div>
                    <label className={Styles.label} >Imagen:</label>
                    <input className={Styles.input} type="file" placeholder="https://..."



                        name="imagen" // Atributo clave
                        value={datosForm.imagen}
                        onChange={manejarCambio}


                    />
                </div>




                <button type="submit">Guardar Producto</button>

            </div>







        </form>

    )
}