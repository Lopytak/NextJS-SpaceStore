import {digitsToRuMonthsObject, enMonthsToDigitsObject, planetNamesRUMap} from "../data/Data";

export function getDates() {
    const currentDate = new Date();
    const nextWeekDate = new Date();
    nextWeekDate.setDate(currentDate.getDate() + 7);
    return {
        currentDate: formatDate(currentDate),
        nextWeekDate: formatDate(nextWeekDate)
    };
}

export function formatDate(date) {
    const currentYear = date.getFullYear().toString();
    const currentMonth = (date.getMonth() + 1).toString();
    const currentDate = date.getDate().toString();
    return currentYear + '-'
        + (currentMonth.length === 1 ? '0' + currentMonth : currentMonth) + '-'
        + (currentDate.length === 1 ? '0' + currentDate.toString() : currentDate.toString());
    }

export function formatAsteroidObject(asteroidObject) {
    let asteroidObjectDate = asteroidObject.date.split('-');
    asteroidObjectDate =
        asteroidObjectDate[2] + ' '
        + digitsToRuMonthsObject[asteroidObjectDate[1]] + ' '
        + asteroidObjectDate[0];
    asteroidObject.distanceKilometers = asteroidObject.distanceKilometers.split('.')[0];
    let asteroidObjectKilometers = [];
    for (let i = asteroidObject.distanceKilometers.length; i > 0; i -= 3) {
        if (i < 3) asteroidObjectKilometers = asteroidObjectKilometers.concat(asteroidObject.distanceKilometers.slice(0, i % 3));
        else asteroidObjectKilometers = asteroidObjectKilometers.concat(asteroidObject.distanceKilometers.slice(i - 3, i));
    }
    asteroidObjectKilometers = asteroidObjectKilometers.reverse().join(' ');

    return {
        id: asteroidObject.id,
        date: asteroidObjectDate,
        distanceKilometers: asteroidObjectKilometers,
        distanceLunar: asteroidObject.distanceLunar.split('.')[0],
        name: asteroidObject.name.slice(
            asteroidObject.name.indexOf('(') + 1,
            asteroidObject.name.indexOf(')')
        ),
        diameter: asteroidObject.diameter.toString().split('.')[0],
        isHazardous: asteroidObject.isHazardous
    };
}

export function formatDateTime(dateTime) {
    let parsedDateTime = dateTime.split('-').join('.')
    parsedDateTime = parsedDateTime.substring(9, 11)
        + parsedDateTime.substring(4, 5)
        + enMonthsToDigitsObject[parsedDateTime.substring(5, 8)]
        + parsedDateTime.substring(8, 9)
        + parsedDateTime.substring(0, 4)
        + ' в' + parsedDateTime.substring(11)
    return parsedDateTime
}

export function sortDatesArray(firstDate, secondDate) {
    if (new Date(firstDate) > new Date(secondDate)) return 1;
    else if (new Date(firstDate) < new Date(secondDate)) return -1;
}

export function declineAsteroidWord(quantity) {
    if (quantity % 100 > 10 && quantity % 100 < 15) return 'астероидов';
    else if (quantity % 10 === 1) return 'астероид';
    else if (quantity % 10 > 1 && quantity % 10 < 5) return 'астероида'
    else return 'астероидов'
}

export function findCurrentApproachData(approachData) {
    const currentApproachData = {
        approachDate: '',
        distanceKM: 0,
        distanceLunar: 0
    }

    approachData.forEach(item => {
        if (
            new Date(item.close_approach_date) >= new Date(getDates().currentDate) &&
            new Date(item.close_approach_date) <= new Date(getDates().nextWeekDate)
        ) {
            currentApproachData.approachDate = item.close_approach_date
            currentApproachData.distanceKM = item.miss_distance.kilometers
            currentApproachData.distanceLunar = item.miss_distance.lunar
        }
    })

    return currentApproachData
}

export function roundNumber(number, digits) {
    const power = Math.pow(10, digits)
    return (Math.round(Number(number) * power) / power).toString()
}

export function transformAsteroidDescriptionData(data) {
    const closeApproachesArray = data.close_approach_data.map(item => {
        return {
            closestApproachTime: formatDateTime(item.close_approach_date_full),
            distanceAE: roundNumber(item.miss_distance.astronomical, 6),
            distanceKM: roundNumber(item.miss_distance.kilometers, 3),
            distanceLunar: roundNumber(item.miss_distance.lunar, 3),
            distanceMiles: roundNumber(item.miss_distance.miles, 3),
            speedKMPerH: roundNumber(item.relative_velocity.kilometers_per_hour, 2),
            speedKMPerS: roundNumber(item.relative_velocity.kilometers_per_second, 2),
            speedMilesPerH: roundNumber(item.relative_velocity.miles_per_hour, 2),
            orbitingBody: planetNamesRUMap.get(item.orbiting_body) ? planetNamesRUMap.get(item.orbiting_body) : 'Неизвестно'
        }
    })

    return {
        name: data.name,
        mainFeatures: {
            designation: data.designation,
            diameterFeet: roundNumber(data.estimated_diameter.feet.estimated_diameter_min, 3),
            diameterMeters: roundNumber(data.estimated_diameter.meters.estimated_diameter_min, 3),
            diameterKilometers: roundNumber(data.estimated_diameter.kilometers.estimated_diameter_min, 3),
            diameterMiles: roundNumber(data.estimated_diameter.miles.estimated_diameter_min, 3),
            isHazardous: data.is_potentially_hazardous_asteroid ? 'Да' : 'Нет',
            eccentricity: roundNumber(data.orbital_data.eccentricity, 7),
            aphelion: roundNumber(data.orbital_data.aphelion_distance, 3),
            perihelion: roundNumber(data.orbital_data.perihelion_distance, 3),
            perihelionArgument: roundNumber(data.orbital_data.perihelion_argument, 5),
            circulationPeriod: data.orbital_data.data_arc_in_days,
            inclination: roundNumber(data.orbital_data.inclination, 5),
            ascendingNodeLongitude: roundNumber(data.orbital_data.ascending_node_longitude, 5),
            meanAnomaly: roundNumber(data.orbital_data.mean_anomaly, 5),
            absoluteMagnitudeH: data.absolute_magnitude_h,
        },
        closeApproaches: [ ...closeApproachesArray ]
    }
}

