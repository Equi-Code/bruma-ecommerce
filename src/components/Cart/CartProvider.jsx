import { useState } from 'react';
import { CartContext } from './CartContext.jsx';

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Agregar un producto o incrementar su cantidad
    const addToCart = (product, quantity) => {
        setCart((prevCart) => {
            const itemInCart = prevCart.find(
                (item) => item.id === product.id
            );

            if (itemInCart) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                        }
                        : item
                );
            }

            return [...prevCart, { ...product, quantity }];
        });
    };

    //Eliminar un producto del carrito

    const removeItem = (productId) => {
        const updatedCart = cart.filter (item => item.id !== productId );
        setCart (updatedCart)
    }

    // Verificar si un producto ya esta en el carrito

    const isInCart = (productId) =>{
        return cart.some(item => item.id === productId);

    }


const getCantidadActual = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
};

    // Vaciar el carrito
    const clearCart = () => {
        setCart([]);
    };

    // Obtener la cantidad total de unidades
    const getCartQuantity = () => {
        return cart.reduce(
            (acc, item) => acc + item.quantity,
            0
        );
    };

    // Calcular el importe total
    const getCartTotal = () => {
        return cart.reduce(
            (acc, item) => acc + item.precio * item.quantity,
            0
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                removeItem,
                isInCart,
                getCantidadActual,
                addToCart,
                clearCart,
                getCartQuantity,
                getCartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}