#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { printError, printSuccess} from './services/log.service.js';
import { getWeather } from './services/api.service.js';

const saveToken = async (token) => {
    if (!token) {
        printError("Не передан токен.");
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен Сохранён...');
    } catch (error) {
        printError(error.message);
    }
    
}

const getForcast = async () => {
    try {
        const weather = await getWeather('moscow');
        console.log(weather);
    } catch (error) {
        if (error.responce?.status == 404) {
            printError('Неверно указан город.');
        }else if (e?.responce?.status == 401) {
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
    }
    
}

const initCLI = () => {
    const args = getArgs(process.argv)

    if (args.h) {
        printHelp();
    }

    if (args.s) {
        
    }

    if (args.t) {
        return saveToken(args.t);
    }

    getForcast();
};

initCLI();