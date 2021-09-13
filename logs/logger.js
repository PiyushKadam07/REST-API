const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
 
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
 
const logger = createLogger({
  format: combine(
    label({ label: 'Hello user!' }),
    timestamp(),
    myFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
      new winston.transports.File({ filename: './logs/log_files/info.log', level: 'info' }), 
      new winston.transports.File({ filename: './logs/log_files/error.log', level: 'error' }),
      new winston.transports.File({ filename: './logs/log_files/warn.log', level: 'warn' }),
      new winston.transports.File({ filename: './logs/log_files/combined.log' }),
   ]
});

module.exports = logger;