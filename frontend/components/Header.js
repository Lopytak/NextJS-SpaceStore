import styles from '../styles/Header.module.css'
import { passionOne } from "../fonts/fonts";

const Body = () => {
    return (
        <div className={ [styles.header, styles.flexColumn].join(' ')}>
            <div className={ [styles.headerName, passionOne.className].join(' ') }>ARMAGEDDON 2023</div>
            <div className={ styles.headerDescription }>
                <div className={ styles.headerDescriptionElementMarginBottom }>ООО “Команда им. Б. Уиллиса”.</div>
                <div>Взрываем астероиды с 1998 года.</div>
            </div>
        </div>
    );
};

export default Body;
