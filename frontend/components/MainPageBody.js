import styles from '../styles/MainPageBody.module.css';
import AsteroidList from './AsteroidList';
import CartLink from './CartLink';
import Earth from "./Earth";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {DataService} from "../services/DataService";

const MainPageBody = () => {
    const [parsedData, setParsedData] = useState({})

    const { isPending, error, data } = useQuery({
        queryKey: ['asteroidList'],
        queryFn: () => DataService.getData(),
        select: ({data}) => data
    });

    useEffect(() => {
        if (!!data) {
            setParsedData(data)
        }
    }, [data])

    return (
        <>
            <div className={ styles.flexRow }>
                <Earth/>
                <AsteroidList data={ parsedData } error={ error } isPending={ isPending }/>
            </div>
            <CartLink/>
        </>
    );
};

export default MainPageBody;
