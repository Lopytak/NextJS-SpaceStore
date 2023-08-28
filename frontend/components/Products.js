import styles from '../styles/Products.module.css';
import warningSignImage from '../images/warningSign.png';
import asteroidImage from '../images/asteroid.png';
import arrowLeftRight from '../images/arrowLeftRight.png';
import Image from "next/image";
import cursorPointer from '../images/cursorPointer.png';

const Products = () => {

    return (
        <div className={ styles.asteroidListWrapper }>
            <div>
                <p className={ styles.asteroidListHeaderName }>Ближайшие подлёты астероидов</p>
                <div className={ styles.asteroidListHeaderDescription }>
                    <b>в километрах</b> | <u>в лунных орбитах</u>
                </div>
            </div>
            <div>
                <div className={ styles.asteroidListElement }>
                    <p className={ styles.asteroidDate }>12 сент 2023</p>
                    <div className={ styles.flexRow }>
                        <div className={ styles.flexColumn }>
                            <p className={ styles.asteroidListElementDistanceKM }>5 652 475 км</p>
                            <Image
                                src={ arrowLeftRight }
                                alt='Стрелка влево-вправо'
                                className={ styles.arrowLeftRight }
                            />
                        </div>
                        <Image
                            src={ asteroidImage }
                            alt='Картинка астероида'
                            className={ styles.asteroidImage }
                        />
                        <div className={ styles.flexColumn }>
                            <p className={ styles.asteroidListElementDistanceLunarOrbit }><u>2021 FQ</u></p>
                            <p className={ styles.asteroidListElementDiameter }>Ø 85 м</p>
                        </div>
                    </div>
                    <div className={ styles.flexRow }>
                        <a className={ styles.orderButton } style={{ cursor: `url(${cursorPointer.src}), auto` }}>ЗАКАЗАТЬ</a>
                        <div className={ styles.flexRow }>
                            <p className={ styles.warningMessage }>

                                <Image
                                    src={ warningSignImage }
                                    alt='Знак предупреждения'
                                    className={ styles.warningSign }
                                />
                                Опасен
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
