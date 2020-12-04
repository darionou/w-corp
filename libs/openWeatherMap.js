const axios = require('axios');

const { OPENWEATHERMAP_KEY } = process.env;

const getWeatherByCityName = async ({
  location,
}) => {
  const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${OPENWEATHERMAP_KEY}`);
  return weather.data;
};

module.exports = {
  getWeatherByCityName,
};
