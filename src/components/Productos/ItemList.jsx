import Item from './Item.jsx';

export default function ItemList({ productos }) {

    return (
        <div className="productos-grid">
            {
                productos.map((p) => (
                    <Item
                        key={p.id}
                        id={p.id}
                        imagen={p.imagen}
                        nombre={p.nombre}
                        precio={p.precio}
                        tipo={p.tipo}
                        descripcion={p.descripcion}
                        stock={p.stock}
                        etiqueta={p.etiqueta}
                        presentacion={p.presentacion}
                    />
                ))
            }
        </div>
    );
}