import Item from './Item.jsx';

export default function ItemList({ productos }) {

    return (
        <div className="productos-grid">
            {
                productos.map((producto) => (
                    <Item
                        key={producto.id}
                        nombre={producto.nombre}
                        precio={producto.precio}
                        tipo={producto.tipo}
                        descripcion={producto.descripcion}
                        stock={producto.stock}
                        imagen={producto.imagen}
                    />
                ))
            }
        </div>
    );
}