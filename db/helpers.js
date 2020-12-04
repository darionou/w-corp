const connectToDatabase = require('./connect');
const WeatherLocations = require('./models/WeatherLocation');
const { getMonth, getLastHalfHourDate } = require('../utils');

const getCurrentWeatherFromDB = async ({
  location,
}) => {
  await connectToDatabase();
  const lastHalfHourDate = getLastHalfHourDate();
  const result = await WeatherLocations
    .findOne({ date: { $gte: lastHalfHourDate }, location });
  return result && result.toObject();
};

const addCurrentWeatherToDB = async ({
  weather,
  location,
}) => {
  await connectToDatabase();
  const result = await WeatherLocations.create({
    temperature: weather.main.temp,
    date: new Date(),
    location,
  });

  return result;
};

const getLocationMonthMisuration = async ({
  month,
  location,
}) => {
  await connectToDatabase();
  const monthNumber = getMonth(month);

  const result = await WeatherLocations.aggregate([
    { $addFields: { month: { $month: '$date' } } },
    { $match: { month: monthNumber, location } },
  ]);

  return result.lenght > 0 && result.map((res) => res.toObject());
};

module.exports = {
  getCurrentWeatherFromDB,
  addCurrentWeatherToDB,
  getLocationMonthMisuration,
};
