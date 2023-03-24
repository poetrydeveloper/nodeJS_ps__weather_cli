#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {
  saveKeyValue,
  TOKEN_DICTIONARY,
  getKeyValue,
} from "./services/storage.service.js";
import {
  printError,
  printSuccess,
  printWeather,
} from "./services/log.service.js";
import { getWeather, getIcon } from "./services/api.service.js";

const saveToken = async (token) => {
  if (!token) {
    printError("Not find token.");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен Сохранён...");
  } catch (error) {
    printError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city) {
    printError("Not find city.");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("Город Сохранён...");
  } catch (error) {
    printError(error.message);
  }
};
const getForcast = async () => {
  try {
    const city = await getKeyValue(TOKEN_DICTIONARY.city);
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (error) {
    if (error.responce?.status == 404) {
      printError("Неверно указан город.");
    } else if (e?.responce?.status == 401) {
      printError("Неверно указан токен");
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.s) {
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  return getForcast();
};

initCLI();
