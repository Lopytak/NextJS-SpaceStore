import Layout from "../../components/layout/Layout";
import {useRouter} from "next/router";
import {useQuery} from "@tanstack/react-query";
import {DataService} from "../../services/DataService";
import {useEffect, useState} from "react";
import {transformAsteroidDescriptionData} from "../../utils/Utils";
import AsteroidDescription from "../../components/AsteroidDescription";
import styles from "../../styles/[id].module.css";

const AsteroidPage = () => {
    const { query } = useRouter()
    const [ parsedAsteroidData, setParsedAsteroidData ] = useState({})

    const { isPending, error, data } = useQuery({
        queryKey: ['asteroidData', query.id],
        queryFn: () => DataService.getAsteroidById(query.id),
        // initialData: { data: {} },
        enabled: !!query.id,
        select: ({data}) => transformAsteroidDescriptionData(data)
    });

    useEffect(() => {
        if (!!data) {
            setParsedAsteroidData(data)
        }
    }, [data])

    return (
        <Layout Body={
            error ?
                <div className={ [styles.flexRow, styles.loadingData].join(' ') }>Ошибка</div>
                :
                <div>
                    {
                        isPending ?
                            <p className={ [styles.flexRow, styles.loadingData].join(' ') }>Загрузка...</p>
                            :
                            <div>
                                <button onClick={() => console.log('fgdfdfg')}></button>
                                <AsteroidDescription descriptionData={ parsedAsteroidData }/>
                            </div>
                    }
                </div>
        }/>
    );
};

export default AsteroidPage;
