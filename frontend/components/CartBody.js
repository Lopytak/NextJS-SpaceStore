import styles from '../styles/CartBody.module.css';
import Earth from "./Earth";
import AsteroidItem from "./AsteroidItem";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../providers/CartProvider";
import {useQuery} from "@tanstack/react-query";
import {DataService} from "../services/DataService";
import {findCurrentApproachData, formatAsteroidObject} from "../utils/Utils";

const CartBody = () => {
    const { cart, distanceMeasure } = useContext(CartContext);

    const [ cartList, setCartList ] = useState([])

    const { isPending, error, data } = useQuery({
        queryKey: ['cartData'],
        queryFn: () => DataService.getAsteroidsById(cart),
        select: (data) => data.map(item => item.data)
    });

    useEffect(() => {
        if (!!data) {
            if (cartList.length !== 0) setCartList(prev => prev = [])
            data.forEach(item => {
                const currentApproachData = findCurrentApproachData(item.close_approach_data)
                setCartList(prev => prev = prev.concat(
                    [
                        formatAsteroidObject({
                            id: item.neo_reference_id,
                            date: currentApproachData.approachDate,
                            distanceKilometers: currentApproachData.distanceKM,
                            distanceLunar: currentApproachData.distanceLunar,
                            name: item.name,
                            diameter: item.estimated_diameter.meters.estimated_diameter_min,
                            isHazardous: item.is_potentially_hazardous_asteroid
                        })
                    ]
                ));
            })
        }
    }, [data])

    return (
        <div className={ styles.flexRow }>
            <Earth/>
            <span className={ styles.asteroidListWrapper }>
                <div>
                    <p className={ styles.asteroidListHeaderName }>
                        {
                            cart.length ? <>Заказ отправлен!</> : <>Нет астероидов!</>
                        }
                    </p>
                </div>
                {
                    error ?
                        <div className={ [styles.flexRow, styles.loadingData].join(' ') }>Ошибка</div>
                        :
                        <div className={ styles.asteroidList }>
                            {
                                isPending ? <p className={ [styles.flexRow, styles.loadingData].join(' ') }>Загрузка... </p> : cartList.map(asteroid => <AsteroidItem
                                        key={ asteroid.id }
                                        id={ asteroid.id }
                                        date={ asteroid.date }
                                        distanceKM={ asteroid.distanceKilometers }
                                        distanceLunar={ asteroid.distanceLunar }
                                        name={ asteroid.name }
                                        diameter={ asteroid.diameter }
                                        isHazardous={ asteroid.isHazardous }
                                        distanceMeasure={ distanceMeasure }
                                        isBuyable={ false }
                                    />
                                )
                            }
                        </div>
                }
            </span>
        </div>
    );
};

export default CartBody;
