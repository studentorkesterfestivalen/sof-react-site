import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

export const authUrl = env.REACT_APP_API_ENDPOINT + "auth";
export const changePassRedirect = env.REACT_APP_URL + '/account/reset_password/new'

//export default Constants;
