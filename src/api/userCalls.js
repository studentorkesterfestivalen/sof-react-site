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

export const getUserUuid = () => {
  return api.get('/users/get_user_uuid');
}

export const sendEmailPassChange = data => {
 return api.post('/auth/password', {
    timeout: 0,
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


export const updateUser = data => {
    return api.put('/users/' + data.id, {
      display_name: data.displayName,
      admin_permissions: data.adminPermissions,
      usergroup : data.usergroup,
      rebate_balance: data.rebateBalance
  })
}
