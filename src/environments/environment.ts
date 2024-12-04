// eslint-disable-next-line @typescript-eslint/no-require-imports
import { version } from '../../package.json';
const BACKEND_URL = 'http://localhost:9000';
export const environment = {
  production: true,
  appVersion: version,
  appURL: 'localhost:4200',
  apiUrl: `${BACKEND_URL}/api`,
  apiAuthUrl: `${BACKEND_URL}/api/public/auth`,
  allApiUrl: `${BACKEND_URL}/api/all/user`,
  cvApiUrl: `${BACKEND_URL}/api/applicant/cv`,

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
