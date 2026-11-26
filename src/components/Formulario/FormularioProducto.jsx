
import Styles from '../../css/Formulario.module.css';

export default function FormularioProducto({
    datosForm,
    manejarCambio,
    manejarCambioAnidado,
    manejarCambioLista,
    agregarElemento,
    quitarElemento,
    manejarCambioObjetoLista,
    agregarObjetoLista,
    manejarCambioImagen,
    manejarCambioImagenes,
    manejarEnvio,
    enviando,
    modoEdicion,
    onCancelar
}) {
    const campo = (nombre, etiqueta, placeholder = '', tipo = 'text') => (
        <div className={Styles.campo}>
            <label className={Styles.label} htmlFor={nombre}>{etiqueta}</label>
            <input
                className={Styles.input}
                id={nombre}
                name={nombre}
                type={tipo}
                value={datosForm[nombre]}
                onChange={manejarCambio}
                placeholder={placeholder}
                disabled={nombre === 'id' && modoEdicion}
                required={['nombre', 'precio', 'stock', 'tipo'].includes(nombre)}
                min={tipo === 'number' ? '0' : undefined}
            />
        </div>
    );

    const textarea = (nombre, etiqueta, placeholder = '') => (
        <div className={Styles.campo}>
            <label className={Styles.label} htmlFor={nombre}>{etiqueta}</label>
            <textarea
                className={`${Styles.input} ${Styles.textarea}`}
                id={nombre}
                name={nombre}
                value={datosForm[nombre]}
                onChange={manejarCambio}
                placeholder={placeholder}
            />
        </div>
    );

    const campoAnidado = (grupo, nombre, etiqueta, tipo = 'text') => (
        <div className={Styles.campo}>
            <label className={Styles.label} htmlFor={`${grupo}-${nombre}`}>{etiqueta}</label>
            <input
                className={Styles.input}
                id={`${grupo}-${nombre}`}
                type={tipo}
                min={tipo === 'number' ? '0' : undefined}
                max={tipo === 'number' ? '5' : undefined}
                value={datosForm[grupo][nombre]}
                onChange={(e) => manejarCambioAnidado(grupo, nombre, e.target.value)}
            />
        </div>
    );

    const grupo = (numero, titulo, descripcion, contenido) => (
        <section className={Styles.seccion}>
            <div className={Styles.seccionCabecera}>
                <span className={Styles.numeroSeccion}>{numero}</span>
                <div>
                    <h3>{titulo}</h3>
                    <p>{descripcion}</p>
                </div>
            </div>
            <div className={Styles.seccionContenido}>{contenido}</div>
        </section>
    );

    const botonAgregar = (texto, accion) => (
        <button type="button" className={Styles.botonAgregar} onClick={accion}>
            <span>+</span> {texto}
        </button>
    );

    const botonQuitar = (texto, accion) => (
        <button type="button" className={Styles.botonQuitar} onClick={accion}>
            × {texto}
        </button>
    );

    return (
        <form className={Styles.form} onSubmit={manejarEnvio}>
            <div className={Styles.introForm}>
                <span className={Styles.eyebrow}>BRUMA · CATÁLOGO</span>
                <h2 className={Styles.tituloForm}>
                    {modoEdicion ? 'Editar producto' : 'Nuevo producto'}
                </h2>
                <p>
                    {modoEdicion
                        ? 'Actualizá la información de este café.'
                        : 'Completá los detalles para incorporar un café al catálogo.'}
                </p>
                <span className={Styles.notaObligatorios}>* Campos obligatorios</span>
            </div>

            {grupo('01', 'Información general', 'Identificación y descripción del producto',
                <>
                    <div className={Styles.gridDos}>
                        {campo('id', 'ID numérico', 'Ej: 31', 'number')}
                        {campo('nombre', 'Nombre del producto *', 'Ej: Brasil')}
                    </div>
                    <div className={Styles.gridDos}>
                        {campo('tipo', 'Tipo de producto *', 'Ej: Café en grano')}
                        {campo('etiqueta', 'Etiqueta', 'Ej: Edición limitada')}
                    </div>
                    {textarea('descripcion', 'Descripción', 'Contá qué hace especial a este café...')}
                    <div className={Styles.gridDos}>
                        {campo('lote', 'Lote', 'Ej: Lote BR-31')}
                        {campo('presentacion', 'Presentación principal', 'Ej: Bolsa x250 g')}
                    </div>
                </>
            )}

            {grupo('02', 'Precio y disponibilidad', 'Información comercial y unidades disponibles',
                <div className={Styles.gridDos}>
                    {campo('precio', 'Precio ($) *', 'Ej: 15000', 'number')}
                    {campo('stock', 'Stock disponible *', 'Ej: 20', 'number')}
                </div>
            )}

            {grupo('03', 'Imágenes del producto', 'Imagen principal y fotografías complementarias',
                <>
                    <div className={Styles.campo}>
                        <label className={Styles.label} htmlFor="imagen">URL de imagen principal</label>
                        <input
                            className={Styles.input}
                            id="imagen"
                            name="imagen"
                            type="url"
                            value={datosForm.imagen}
                            onChange={manejarCambio}
                            placeholder="https://..."
                        />
                    </div>

                    <div className={Styles.campo}>
                        <label className={Styles.label} htmlFor="imagenFile">Seleccionar imagen principal</label>
                        <input
                            className={Styles.inputFile}
                            id="imagenFile"
                            type="file"
                            accept="image/*"
                            onChange={manejarCambioImagen}
                        />
                        <p className={Styles.ayuda}>
                            Si seleccionás un archivo, se utilizará en lugar de la URL.
                            Si estás editando y no seleccionás uno, se conserva la imagen actual.
                        </p>
                    </div>

                    <div className={Styles.subgrupo}>
                        <h4>Galería de imágenes</h4>
                        <p className={Styles.ayuda}>Agregá imágenes adicionales mediante URL.</p>
                        {datosForm.imagenes.map((url, indice) => (
                            <div className={Styles.itemLista} key={indice}>
                                <input
                                    className={Styles.input}
                                    type="url"
                                    value={url}
                                    placeholder="https://..."
                                    onChange={(e) => manejarCambioLista('imagenes', indice, e.target.value)}
                                />
                                {botonQuitar('Quitar', () => quitarElemento('imagenes', indice))}
                            </div>
                        ))}
                        {botonAgregar('Agregar URL', () => agregarElemento('imagenes'))}
                    </div>

                    <div className={Styles.campo}>
                        <label className={Styles.label} htmlFor="imagenesFiles">Cargar varias imágenes</label>
                        <input
                            className={Styles.inputFile}
                            id="imagenesFiles"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={manejarCambioImagenes}
                        />
                        <p className={Styles.ayuda}>Las imágenes seleccionadas se agregarán a la galería existente.</p>
                    </div>
                </>
            )}

            {grupo('04', 'Perfil del café', 'Describí su carácter sensorial',
                <>
                    {textarea('perfilTexto', 'Descripción del perfil', 'Ej: Dulce, equilibrado y con notas...')}
                    <div className={Styles.gridTres}>
                        {campoAnidado('perfil', 'acidez', 'Acidez (1 a 5)', 'number')}
                        {campoAnidado('perfil', 'cuerpo', 'Cuerpo (1 a 5)', 'number')}
                        {campoAnidado('perfil', 'dulzura', 'Dulzura (1 a 5)', 'number')}
                    </div>
                    <div className={Styles.subgrupo}>
                        <h4>Notas aromáticas</h4>
                        {datosForm.notas.map((nota, indice) => (
                            <div className={Styles.itemLista} key={indice}>
                                <input
                                    className={Styles.input}
                                    value={nota}
                                    placeholder="Ej: Chocolate"
                                    onChange={(e) => manejarCambioLista('notas', indice, e.target.value)}
                                />
                                {botonQuitar('Quitar', () => quitarElemento('notas', indice))}
                            </div>
                        ))}
                        {botonAgregar('Agregar nota', () => agregarElemento('notas'))}
                    </div>
                </>
            )}

            {grupo('05', 'Ficha técnica', 'Origen y características del grano',
                <>
                    <div className={Styles.gridDos}>
                        {campoAnidado('ficha', 'origen', 'Origen')}
                        {campoAnidado('ficha', 'altitud', 'Altitud')}
                        {campoAnidado('ficha', 'proceso', 'Proceso')}
                        {campoAnidado('ficha', 'tueste', 'Tueste')}
                    </div>
                    {campoAnidado('ficha', 'variedad', 'Variedad')}
                </>
            )}

            {grupo('06', 'Preparación y moliendas', 'Opciones para disfrutar cada café',
                <>
                    <div className={Styles.subgrupo}>
                        <h4>Moliendas disponibles</h4>
                        {datosForm.moliendas.map((molienda, indice) => (
                            <div className={Styles.itemLista} key={indice}>
                                <input
                                    className={Styles.input}
                                    value={molienda}
                                    placeholder="Ej: Grano entero"
                                    onChange={(e) => manejarCambioLista('moliendas', indice, e.target.value)}
                                />
                                {botonQuitar('Quitar', () => quitarElemento('moliendas', indice))}
                            </div>
                        ))}
                        {botonAgregar('Agregar molienda', () => agregarElemento('moliendas'))}
                    </div>

                    <div className={Styles.subgrupo}>
                        <h4>Métodos de preparación</h4>
                        {datosForm.metodo.map((item, indice) => (
                            <div className={Styles.tarjetaLista} key={indice}>
                                <div className={Styles.tarjetaListaCabecera}>
                                    <span>MÉTODO {String(indice + 1).padStart(2, '0')}</span>
                                    {botonQuitar('Quitar método', () => quitarElemento('metodo', indice))}
                                </div>
                                <div className={Styles.campo}>
                                    <label className={Styles.label}>Título</label>
                                    <input
                                        className={Styles.input}
                                        value={item.titulo}
                                        onChange={(e) => manejarCambioObjetoLista('metodo', indice, 'titulo', e.target.value)}
                                    />
                                </div>
                                <div className={Styles.campo}>
                                    <label className={Styles.label}>Texto</label>
                                    <textarea
                                        className={`${Styles.input} ${Styles.textarea}`}
                                        value={item.texto}
                                        onChange={(e) => manejarCambioObjetoLista('metodo', indice, 'texto', e.target.value)}
                                    />
                                </div>
                                <div className={Styles.campo}>
                                    <label className={Styles.label}>Nota</label>
                                    <input
                                        className={Styles.input}
                                        value={item.nota}
                                        onChange={(e) => manejarCambioObjetoLista('metodo', indice, 'nota', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                        {botonAgregar('Agregar método', () => agregarObjetoLista('metodo', { titulo: '', texto: '', nota: '' }))}
                    </div>

                    <div className={Styles.subgrupo}>
                        <h4>Presentaciones comerciales</h4>
                        {datosForm.presentaciones.map((item, indice) => (
                            <div className={Styles.tarjetaLista} key={indice}>
                                <div className={Styles.tarjetaListaCabecera}>
                                    <span>PRESENTACIÓN {String(indice + 1).padStart(2, '0')}</span>
                                    {botonQuitar('Quitar', () => quitarElemento('presentaciones', indice))}
                                </div>
                                <div className={Styles.campo}>
                                    <label className={Styles.label}>Nombre</label>
                                    <input
                                        className={Styles.input}
                                        value={item.label}
                                        placeholder="Ej: Bolsa x250 g"
                                        onChange={(e) => manejarCambioObjetoLista('presentaciones', indice, 'label', e.target.value)}
                                    />
                                </div>
                                <div className={Styles.campo}>
                                    <label className={Styles.label}>Detalle</label>
                                    <input
                                        className={Styles.input}
                                        value={item.detalle}
                                        placeholder="Descripción de la presentación"
                                        onChange={(e) => manejarCambioObjetoLista('presentaciones', indice, 'detalle', e.target.value)}
                                    />
                                </div>
                                <div className={Styles.campo}>
                                    <label className={Styles.label}>Precio</label>
                                    <input
                                        className={Styles.input}
                                        type="number"
                                        min="0"
                                        value={item.precio}
                                        onChange={(e) => manejarCambioObjetoLista('presentaciones', indice, 'precio', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                        {botonAgregar('Agregar presentación', () => agregarObjetoLista('presentaciones', { label: '', detalle: '', precio: '' }))}
                    </div>
                </>
            )}

            {grupo('07', 'Cita de cata', 'Una frase para transmitir la experiencia del café',
                <>
                    {campoAnidado('cita', 'autor', 'Autor de la cita')}
                    <div className={Styles.campo}>
                        <label className={Styles.label} htmlFor="cita-texto">Texto de la cita</label>
                        <textarea
                            className={`${Styles.input} ${Styles.textarea}`}
                            id="cita-texto"
                            value={datosForm.cita.texto}
                            onChange={(e) => manejarCambioAnidado('cita', 'texto', e.target.value)}
                        />
                    </div>
                </>
            )}

            <div className={Styles.accionesForm}>
                <button type="submit" className={Styles.botonGuardar} disabled={enviando}>
                    {enviando
                        ? 'Guardando producto...'
                        : modoEdicion ? 'Actualizar producto' : 'Guardar producto'}
                </button>
                {modoEdicion && (
                    <button
                        type="button"
                        className={Styles.botonCancelar}
                        onClick={onCancelar}
                        disabled={enviando}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}
