import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf((info: winston.Logform.TransformableInfo) => {
      const { timestamp, level, message } = info;
      return `${timestamp ?? ''} [${level.toUpperCase()}]: ${message}`;
    }),
  ),
  transports: [new winston.transports.Console()],
});

// If we're not in production, log to the console with a simple format
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default logger;
