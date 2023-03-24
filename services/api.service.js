import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    console.log(token);
    if (!token) {
        throw new Error('No api key.');
    }

    const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appId: token,
            lang: 'ru',
            units: 'metric'
        }
    });
    return data;
};

export { getWeather };