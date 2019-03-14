import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

export const authUrl = env.REACT_APP_API_ENDPOINT + "auth";
export const changePassRedirect = process.env.PUBLIC_URL + '/account/newpass'

//export default Constants;
