import axios from "axios";
import {getDates} from "../utils/Utils";

export const DataService = {
    async getData() {
        return await axios.get(
            `https://api.nasa.gov/neo/rest/v1/feed?
            start_date=${getDates().currentDate}
            &end_date=${getDates().nextWeekDate}
            &api_key=K2RKfY1bG5Xh0mcqOTgbyyumHrqvpRe25OUafCG6`
        );
    },

    async getAsteroidById(asteroidID) {
        return await axios.get(
            `https://api.nasa.gov/neo/rest/v1/neo/${asteroidID}?api_key=K2RKfY1bG5Xh0mcqOTgbyyumHrqvpRe25OUafCG6`
        );
    },

    // async getTemp(asteroidID) {
    //     const response = await axios.get(
    //         `https://dummyjson.com/products/${asteroidID}`
    //     )
    //     console.log(asteroidID)
    //     console.log(response.data)
    //
    //     return response.data;
    // },

    async getAsteroidsById(asteroidIDs) {
        const responseArray = []

        for (let i = 0; i < asteroidIDs.length; i++) {
            responseArray.push( await this.getAsteroidById(asteroidIDs[i]) )
        }

        return responseArray;
    }
}
