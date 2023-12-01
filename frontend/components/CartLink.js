import styles from '../styles/CartLink.module.css';
import cursorPointer from '../public/images/cursorPointer.png';
import {useContext} from "react";
import {CartContext} from "../providers/CartProvider";
import {declineAsteroidWord} from "../utils/Utils";
import Link from "next/link";

const CartLink = () => {
    const { cart } = useContext(CartContext);

    return (
        <div className={ styles.basketLinkWrapper }>
            <div className={ [styles.basketLinkTextWrapper, styles.flexColumn].join(' ') }>
                <p className={ styles.basketLinkName }>Корзина</p>
                <p>{ cart.length + ' ' + declineAsteroidWord(cart.length) }</p>
            </div>
            <Link
                href='/cart'
                className={ styles.basketLinkButton }
                style={{ cursor: `url(${cursorPointer.src}), auto` }}
            >
                Отправить
            </Link>
        </div>
    );
};

export default CartLink;
