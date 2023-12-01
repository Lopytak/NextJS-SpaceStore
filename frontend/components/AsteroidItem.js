import styles from "../styles/AsteroidItem.module.css";
import Image from "next/image";
import arrowLeftRight from "../public/images/arrowLeftRight.png";
import asteroidImage from "../public/images/asteroid.png";
import warningSignImage from "../public/images/warningSign.png";
import cursorPointer from "../public/images/cursorPointer.png";
import Link from "next/link";

const AsteroidItem = ({
    id,
    date,
    distanceKM,
    distanceLunar,
    name,
    diameter,
    isHazardous,
    distanceMeasure = 'kilometers',
    addAsteroidToCart = undefined,
    cart = undefined,
    isBuyable
}) => {
    return (
        <div className={ styles.asteroidListElement } key={ id }>
            <p className={ styles.asteroidDate }>{ date }</p>
            <div className={ styles.flexRow }>
                <div className={ styles.flexColumn }>
                    <p className={ styles.asteroidListElementDistance }>{ distanceMeasure === 'kilometers' ? distanceKM + ' км' : distanceLunar + ' лун орб'}</p>
                    <Image
                        src={ arrowLeftRight }
                        alt='Стрелка влево-вправо'
                        className={ styles.arrowLeftRight }
                    />
                </div>
                <Image
                    src={ asteroidImage }
                    alt='Астероид'
                    className={
                        diameter < 100 ? styles.asteroidSmallImage : styles.asteroidBigImage
                    }
                />
                <div className={ styles.flexColumn }>
                    <Link
                        className={ styles.asteroidListElementName }
                        style={{ cursor: `url(${cursorPointer.src}), auto` }}
                        href={ `/asteroid/${id}` }
                    >
                        { name }
                    </Link>
                    <p className={ styles.asteroidListElementDiameter }>Ø { diameter } м</p>
                </div>
            </div>
            <div className={ styles.flexRow }>
                {
                    isBuyable ?
                        <a
                            onClick={ () => addAsteroidToCart(id) }
                            className={ [styles.orderButton, cart.includes(id) ? styles.orderButtonUndo : styles.orderButtonDo].join(' ') }
                            style={{ cursor: `url(${cursorPointer.src}), auto` }}>
                            { cart.includes(id) ? <>В КОРЗИНЕ</> : <>ЗАКАЗАТЬ</> }
                        </a> : false
                }
                <div className={ styles.flexRow }>
                    {
                        isHazardous ?
                            (<p className={styles.warningMessage}>

                                <Image
                                    src={warningSignImage}
                                    alt='Знак предупреждения'
                                    className={styles.warningSign}
                                />
                                Опасен
                            </p>) : false
                    }
                </div>
            </div>
        </div>
    )
}

export default AsteroidItem
