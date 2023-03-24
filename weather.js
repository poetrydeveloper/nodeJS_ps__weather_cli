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

    getWeather('moscow');
    console.log('начинаем читать москов');
};

initCLI();