import { logger } from 'react-native-logs';

export const log = logger.createLogger({
  colors: {
    info: 'blueBright',
    warn: 'yellowBright',
    error: 'redBright',
    debug: 'white',
  },
});
