import Styles from '../css/Formulario.module.css'

export default function FormularioProducto({ datosForm, manejarCambio, manejarEnvio }) {

    return (
        <form className={Styles.form} onSubmit={manejarEnvio}>

            <h2 className={Styles.tituloForm}>Agregar nuevo producto</h2>

            <div className={Styles.campo}>
                <label className={Styles.label} htmlFor="nombre">Nombre del producto</label>
                <input
                    className={Styles.input}
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Ej: Brasil"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                    autoComplete="off"
                    required
                />
            </div>

            <div className={Styles.campo}>
                <label className={Styles.label} htmlFor="tipo">Tipo</label>
                <input
                    className={Styles.input}
                    id="tipo"
                    name="tipo"
                    type="text"
                    placeholder="Ej: Tostado medio"
                    value={datosForm.tipo}
                    onChange={manejarCambio}
                    autoComplete="off"
                    required
                />
            </div>

            <div className={Styles.campo}>
                <label className={Styles.label} htmlFor="descripcion">Descripción</label>
                <textarea
                    className={`${Styles.input} ${Styles.textarea}`}
                    id="descripcion"
                    name="descripcion"
                    placeholder="Ej: Surtido de 25 cápsulas compatibles con Nespresso."
                    value={datosForm.descripcion}
                    onChange={manejarCambio}
                    required
                />
            </div>

            <div className={Styles.fila}>
                <div className={Styles.campo}>
                    <label className={Styles.label} htmlFor="precio">Precio ($)</label>
                    <input
                        className={Styles.input}
                        id="precio"
                        name="precio"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Ej: 9500"
                        value={datosForm.precio}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <div className={Styles.campo}>
                    <label className={Styles.label} htmlFor="stock">Stock</label>
                    <input
                        className={Styles.input}
                        id="stock"
                        name="stock"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="Ej: 5"
                        value={datosForm.stock}
                        onChange={manejarCambio}
                        required
                    />
                </div>
            </div>

            <div className={Styles.campo}>
                <label className={Styles.label} htmlFor="imagen">Imagen</label>
                <input
                    className={Styles.input}
                    id="imagen"
                    name="imagen"
                    type="file"
                    accept="image/*"
                    onChange={manejarCambio}
                />
                <p className={Styles.ayuda}>PNG, JPG o WebP. Mejor si es vertical (4:5).</p>
            </div>

            <button type="submit" className={Styles.boton}>Guardar producto</button>

        </form>
    )
}