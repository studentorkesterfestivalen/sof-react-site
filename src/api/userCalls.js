import api from './axiosInstance';

export const getUserFromEmail = data => {
  return api.get('/users/get_user', {
    params:{
      email : data.email.toLowerCase()
    }
  });
}


export const getUser= id => {
  return api.get('/users/' + id );
}
