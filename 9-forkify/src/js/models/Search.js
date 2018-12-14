// food2fork API information:
// Search api query
// https://www.food2fork.com/api/search

// Recipe details api query
// https://www.food2fork.com/api/get

// my API key: 
// e772f8a0964731e9eda12b4717d9e5f4
import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResult() {
        const key = 'e772f8a0964731e9eda12b4717d9e5f4';
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}