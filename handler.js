const bodyParser = require('body-parser');

const serverless = require('serverless-http');

const express = require('express');
const { getLogger } = require('./logger');

const app = express();

const logger = getLogger('handler');

const weatherServices = require('./services/weather.service');

app.use(bodyParser.json({ strict: false }));

app.get('/weather/live', async (req, res) => {
  try {
    logger.info('[getWeather] start', { req });
    const result = await weatherServices.getWeather(req);
    logger.info('[getWeather] result', { result });
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: {
        ...error, message: error.message,
      },
    });
  }
});

app.get('/weather/average', async (req, res) => {
  try {
    logger.info('[getWeatherAverage] start', { req });
    const result = await weatherServices.getWeatherAverage(req);
    logger.info('[getWeatherAverage] result', { result });
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: {
        ...error, message: error.message,
      },
    });
  }
});

module.exports = {
  app: serverless(app),
};
