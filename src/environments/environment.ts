// eslint-disable-next-line @typescript-eslint/no-require-imports
import { version } from '../../package.json';

export const environment = {
  production: true,
  appVersion: version,
  apiUrl: 'http://localhost:9000/api',
  apiAuthUrl: 'http://localhost:9000/api/public/auth',

  settings: {
    auth: {
      // OAuth2 credentials
      clientId: 'fake-client-id', // <Your auth client id here>
      secretId: 'fake-secret-id', // <Your auth secret id here>

      // keys to store tokens at local storage
      accessTokenKey: 'DoPS3ZrQjM',
      refreshTokenKey: 'nmlP8PW2nb',
    },
  },
};
