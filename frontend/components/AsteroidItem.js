import styles from "../styles/AsteroidItem.module.css";
import Image from "next/image";
import arrowLeftRight from "../public/images/arrowLeftRight.png";
import asteroidImage from "../public/images/asteroid.png";
import warningSignImage from "../public/images/warningSign.png";
import cursorPointer from "../public/images/cursorPointer.png";
import Link from "next/link";

const AsteroidItem = ({
    asteroidData,
    distanceMeasure = 'kilometers',
    addAsteroidToCart = undefined,
    cart = undefined,
    isBuyable
}) => {
    return (
        <div className={ styles.asteroidListElement }>
            <p className={ styles.asteroidDate }>{ asteroidData.date }</p>
            <div className={ styles.flexRow }>
                <div className={ styles.flexColumn }>
                    <p className={ styles.asteroidListElementDistance }>{ distanceMeasure === 'kilometers' ? asteroidData.distanceKilometers + ' км' : asteroidData.distanceLunar + ' лун орб'}</p>
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
                        asteroidData.diameter < 100 ? styles.asteroidSmallImage : styles.asteroidBigImage
                    }
                />
                <div className={ styles.flexColumn }>
                    <Link
                        className={ styles.asteroidListElementName }
                        style={{ cursor: `url(${cursorPointer.src}), auto` }}
                        href={ `/asteroid/${asteroidData.id}` }
                    >
                        { asteroidData.name }
                    </Link>
                    <p className={ styles.asteroidListElementDiameter }>Ø { asteroidData.diameter } м</p>
                </div>
            </div>
            <div className={ styles.flexRow }>
                {
                    isBuyable ?
                        <a
                            onClick={ () => addAsteroidToCart(asteroidData.id) }
                            className={ [styles.orderButton, cart.includes(asteroidData.id) ? styles.orderButtonUndo : styles.orderButtonDo].join(' ') }
                            style={{ cursor: `url(${cursorPointer.src}), auto` }}>
                            { cart.includes(asteroidData.id) ? <>В КОРЗИНЕ</> : <>ЗАКАЗАТЬ</> }
                        </a> : false
                }
                <div className={ styles.flexRow }>
                    {
                        asteroidData.isHazardous ?
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
