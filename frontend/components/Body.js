import styles from '../styles/Body.module.css';
import Products from './Products';
import BasketLink from './BasketLink';
import Image from 'next/image';
import EarthImage from '../images/earth.png'

const Header = () => {
    return (
        <div className={ styles.flexRow }>
            <Image
                src={EarthImage}
                alt='Картинка Земли'
                className={ styles.earthPosition }
            />
            <Products/>
            <BasketLink/>
        </div>
    );
};

export default Header;
