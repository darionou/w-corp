const winston = require('winston');
const expressWinston = require('express-winston');
const jsonStringify = require('fast-safe-stringify');
const CustomConsole = require('./customConsole');

const {
  combine, timestamp, printf,
} = winston.format;

const loggers = {};

const customFormat = winston.format((info, opts) => {
  const stringifiedRest = jsonStringify({
    ...info,
    level: undefined,
    message: undefined,
    splat: undefined,
    timestamp: undefined,
  });

  if (stringifiedRest !== '{}') {
    info.params = stringifiedRest;
  } else {
    info.params = '';
  }

  info.topic = opts;

  return info;
});

const getLogger = (category = 'default') => {
  if (!loggers[category]) {
    const consoleTransport = new CustomConsole({
      level: 'debug',
      format: combine(
        timestamp({ format: 'HH:mm:ss' }),
        customFormat(category),
        printf(
          info => `${info.timestamp} [${info.topic}] ${info.level}: ${info.message} ${info.params}`,
        ),
      ),
      colorize: true,
    });

    const categoryLogger = winston.createLogger({
      transports: [consoleTransport],
    });

    categoryLogger.topic = category;
    loggers[category] = categoryLogger;
  }
  return loggers[category];
};

const configureExpressLogger = (app) => {
  const expressLogger = getLogger('express');
  app.use(
    expressWinston.logger({
      winstonInstance: expressLogger,
      meta: false,
      msg:
        'HTTP {{res.statusCode}} {{res.responseTime}}ms - {{req.method}} {{req.url}}',
      colorize: true,
    }),
  );
};

module.exports = {
  configureExpressLogger,
  getLogger,
};
