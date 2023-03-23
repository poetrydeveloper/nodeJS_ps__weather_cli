#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { saveKeyValue } from './services/storage.service.js';
import { printError, printSuccess} from './services/log.service.js';

const saveToken = async (token) => {
    try {
        await saveKeyValue('token', token);
        printSuccess('Токен Сохранён');
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
        // Сохранить город
    }

    if (args.t) {
        return saveToken(args.t);
    }

    // Вывести погоду
};

initCLI();