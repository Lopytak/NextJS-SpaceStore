import styles from '../styles/MainPageBody.module.css';
import AsteroidList from './AsteroidList';
import CartLink from './CartLink';
import Earth from "./Earth";

const MainPageBody = () => {
    return (
        <>
            <div className={ styles.flexRow }>
                <Earth/>
                <AsteroidList/>
            </div>
            <CartLink/>
        </>
    );
};

export default MainPageBody;
