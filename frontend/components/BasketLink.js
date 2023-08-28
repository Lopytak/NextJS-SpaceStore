import styles from '../styles/BasketLink.module.css';
import cursorPointer from '../images/cursorPointer.png';

const BasketLink = () => {
    return (
        <div className={ [styles.flexColumn, styles.basketLinkWrapper].join(' ') }>
            <div className={ styles.basketLinkTextWrapper }>
                <p className={ styles.basketLinkName }>Корзина</p>
                <p>0 астероидов</p>
            </div>
            <a className={ styles.basketLinkButton } style={{ cursor: `url(${cursorPointer.src}), auto` }}>Отправить</a>
        </div>
    );
};

export default BasketLink;
