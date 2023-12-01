import {useEffect, useState} from "react";
import {asteroidDescriptionTitlesArray} from "../data/Data";
import styles from '../styles/AsteroidDescription.module.css'

const AsteroidDescription = ({descriptionData}) => {
    const [mainFeaturesArray, setMainFeaturesArray] = useState([]);
    const [currentFeatures, setCurrentFeatures] = useState('mainFeatures');
    const [closeApproachesArray, setCloseApproachesArray] = useState([])

    useEffect(() => {
        if (!!Object.keys(descriptionData).length) {
            setMainFeaturesArray([])
            for (const mainFeature in descriptionData.mainFeatures) {
                setMainFeaturesArray(arr => [...arr, descriptionData.mainFeatures[mainFeature]])
            }

            descriptionData.closeApproaches.forEach(item => {
                setCloseApproachesArray(arr => [...arr, item])
            })
        }
    }, [descriptionData])

    return (
        <div className={ styles.flexColumn }>
            <div className={ styles.descriptionName }>{ descriptionData.name }</div>
            <div className={ [styles.flexRow, styles.sectionButtonsWrapper].join(' ') }>
                <div className={ currentFeatures === 'mainFeatures' ? styles.measureSelected : styles.measureUnSelected } onClick={ () => setCurrentFeatures('mainFeatures') }>Основные характеристики</div>
                <div className={ currentFeatures === 'closeApproaches' ? styles.measureSelected : styles.measureUnSelected } onClick={ () => setCurrentFeatures('closeApproaches') }>Ближайшие сближения</div>
            </div>
            <div>
                {
                    (currentFeatures === 'mainFeatures') ?
                        <div>
                            {
                                mainFeaturesArray.map((item, key) =>
                                    <div key={key} className={ styles.featureWrapper }>
                                        <div>
                                            <div>
                                                { asteroidDescriptionTitlesArray[key] + ':' }
                                            </div>
                                            <hr className={ styles.underLine }/>
                                        </div>
                                        <div className={ styles.featureValue }>{ item }</div>
                                    </div>
                                )
                            }
                        </div>
                        :
                        <div>
                            {
                                closeApproachesArray.map((closeApproach, key) =>
                                    <div onClick={() => console.log(closeApproach.orbitingBody)} key={key}>
                                        <hr className={ styles.separateLine }/>
                                        <div className={ styles.closeApproachWrapper }>
                                            <div>
                                                <div>Время максимального сближения с Землей:</div>
                                                <hr className={ styles.underLine }/>
                                            </div>
                                            <div className={ styles.closeApproachValue }>{ closeApproach.closestApproachTime }</div>
                                        </div>
                                        <div className={ styles.closeApproachWrapper }>
                                            <div>
                                                <div>Расстояние (в астрономических единицах):</div>
                                                <hr className={ styles.underLine }/>
                                            </div>
                                            <div className={ styles.closeApproachValue }>{ closeApproach.distanceAE }</div>
                                        </div>
                                        <div className={ styles.closeApproachWrapper }>
                                            <div>
                                                <div>Расстояние (в километрах):</div>
                                                <hr className={ styles.underLine }/>
                                            </div>
                                            <div className={ styles.closeApproachValue }>{ closeApproach.distanceKM }</div>
                                        </div>
                                        <div className={ styles.closeApproachWrapper }>
                                            <div>
                                                <div>Расстояние (в лунных орбитах):</div>
                                                <hr className={ styles.underLine }/>
                                            </div>
                                            <div className={ styles.closeApproachValue }>{ closeApproach.distanceLunar }</div>
                                        </div>
                                        <div className={ styles.closeApproachWrapper }>
                                            <div>
                                                <div>Расстояние (в милях):</div>
                                                <hr className={ styles.underLine }/>
                                            </div>
                                            <div className={ styles.closeApproachValue }>{ closeApproach.distanceMiles }</div>
                                        </div>
                                        <div className={ styles.closeApproachWrapper }>
                                            <div>
                                                <div>Скорость (в км/ч):</div>
                                                <hr className={ styles.underLine }/>
                                            </div>
                                            <div className={ styles.closeApproachValue }>{ closeApproach.speedKMPerH }</div>
                                        </div>
                                        <div className={ styles.closeApproachWrapper }>
                                            <div>
                                                <div>Скорость (в км/с):</div>
                                                <hr className={ styles.underLine }/>
                                            </div>
                                            <div className={ styles.closeApproachValue }>{ closeApproach.speedKMPerS }</div>
                                        </div>
                                        <div className={ styles.closeApproachWrapper }>
                                            <div>
                                                <div>Скорость (в милях):</div>
                                                <hr className={ styles.underLine }/>
                                            </div>
                                            <div className={ styles.closeApproachValue }>{ closeApproach.speedMilesPerH }</div>
                                        </div>
                                        <div className={ styles.closeApproachWrapper }>
                                            <div>
                                                <div>Тело орбиты:</div>
                                                <hr className={ styles.underLine }/>
                                            </div>
                                            <div className={ styles.closeApproachValue }>{ closeApproach.orbitingBody }</div>
                                        </div>
                                    </div>
                                    )
                            }
                    </div>
                }
            </div>
        </div>
    )
}

export default AsteroidDescription
