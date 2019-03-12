import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

export const authUrl = env.REACT_APP_API_ENDPOINT + "auth";
export const changePassRedirect = 'http://localhost:3000/account/newpass'

//export default Constants;
