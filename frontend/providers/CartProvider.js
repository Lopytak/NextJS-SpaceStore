import {createContext, useState} from "react";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [distanceMeasure, setDistanceMeasure] = useState('kilometers');
    return (
        <CartContext.Provider value={{ cart, setCart, distanceMeasure, setDistanceMeasure }}>
            { children }
        </CartContext.Provider>
    );
}

export default CartProvider
