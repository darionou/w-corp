const OpenWeatherMapLib = require('../libs/openWeatherMap');
const { getCurrentWeatherFromDB, addCurrentWeatherToDB, getLocationMonthMisuration } = require('../db/helpers');

const getWeather = async (req) => {
  const { location } = req.query;

  const weatherDB = await getCurrentWeatherFromDB({ location });

  if (weatherDB) return weatherDB;

  const weather = await OpenWeatherMapLib.getWeatherByCityName({ location });

  const response = await addCurrentWeatherToDB({ weather, location });
  return response;
};

const getWeatherAverage = async (req) => {
  const { location, month } = req.query;
  const result = await getLocationMonthMisuration({ month, location });
  return result;
};

module.exports = {
  getWeather,
  getWeatherAverage,
};
