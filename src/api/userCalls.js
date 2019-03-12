import api from './axiosInstance';
import  { changePassRedirect } from '../constants';

export const getUserFromEmail = data => {
  return api.get('/users/get_user', {
    params:{
      email : data.email.toLowerCase()
    }
  });
}

export const getUser = id => {
  return api.get('/users/' + id );
}

export const sendEmailPassChange = data => {
 return api.post('/auth/password', {
    email: data.email,
    redirect_url: changePassRedirect
  });
}

export const resetPassword = (data, authParams) => {
  return api.put('/auth/password', {

    password: data.newPassword,
    password_confirmation: data.confirmPassword

  },
  {headers: authParams});
}
