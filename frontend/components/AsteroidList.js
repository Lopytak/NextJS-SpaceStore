import styles from '../styles/AsteroidList.module.css';
import {useContext, useEffect, useState} from "react";
import {formatAsteroidObject, sortDatesArray} from "../utils/Utils";
import {CartContext} from "../providers/CartProvider";
import AsteroidItem from "./AsteroidItem";

const AsteroidList = ({data, error, isPending}) => {

    const { cart, setCart, distanceMeasure, setDistanceMeasure } = useContext(CartContext);

    const [asteroidsArray, setAsteroidsArray] = useState([]);
    const [currentPageCount, setCurrentPageCount] = useState(0);
    const [datesArray, setDatesArray] = useState([]);
    const [addingAsteroids, setAddingAsteroids] = useState(false);

    useEffect(() => {
        if (!!Object.keys(data).length) {
            setDatesArray(Object.keys(data.near_earth_objects).sort(sortDatesArray));
            setAddingAsteroids(true);
        }
    }, [data])

    useEffect(() => {
        if (!!data && addingAsteroids && (datesArray.length > currentPageCount)) {
            data.near_earth_objects[datesArray[currentPageCount]].forEach(item => {
                setAsteroidsArray(arr => arr = arr.concat(
                    [
                        formatAsteroidObject({
                            id: item.neo_reference_id,
                            date: item.close_approach_data[0].close_approach_date,
                            distanceKilometers: item.close_approach_data[0].miss_distance.kilometers,
                            distanceLunar: item.close_approach_data[0].miss_distance.lunar,
                            name: item.name,
                            diameter: item.estimated_diameter.meters.estimated_diameter_min,
                            isHazardous: item.is_potentially_hazardous_asteroid
                        })
                    ]
                ));
            });
            setCurrentPageCount(prev => prev = prev + 1);
        }
        setAddingAsteroids(false);

    }, [addingAsteroids]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);

        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, []);

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setAddingAsteroids(true);
        }
    }

    const addAsteroidToCart = (asteroidID) => {
        if (!cart.includes(asteroidID)) setCart(arr => [...arr, asteroidID]);
        else setCart(arr => [...arr.slice(0, cart.indexOf(asteroidID)), ...arr.slice(cart.indexOf(asteroidID) + 1)]);
    }

    return (
        <span className={ styles.asteroidListWrapper }>
            <div>
                <p className={ styles.asteroidListHeaderName }>Ближайшие подлёты астероидов</p>
                <div className={ styles.asteroidListHeaderDescription }>
                    {
                        <>
                            <span className={ distanceMeasure === 'kilometers' ? styles.measureSelected : styles.measureUnSelected } onClick={ () => setDistanceMeasure(prev => prev = 'kilometers') }>
                                в километрах
                            </span> | <span className={ distanceMeasure === 'kilometers' ? styles.measureUnSelected : styles.measureSelected } onClick={ () => setDistanceMeasure(prev => prev = 'lunar') }>
                                в лунных орбитах
                            </span>
                        </>
                    }
                </div>
            </div>
            {
                error ?
                    <div className={ [styles.flexRow, styles.loadingData].join(' ') }>Ошибка</div>
                    :
                    <div className={ styles.asteroidList }>
                        {
                            isPending ? <p className={ [styles.flexRow, styles.loadingData].join(' ') }>Загрузка... </p> : asteroidsArray.map(asteroid =>
                                <AsteroidItem
                                    key={ asteroid.id }
                                    asteroidData={ asteroid }
                                    distanceMeasure={ distanceMeasure }
                                    addAsteroidToCart={ addAsteroidToCart }
                                    cart={ cart }
                                    isBuyable={ true }
                                />
                            )}
                    </div>
            }
        </span>
    );
};

export default AsteroidList;
