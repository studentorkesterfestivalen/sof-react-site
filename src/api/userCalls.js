import api from './axiosInstance';

export const getUser = data => {
  return api.get('/users/get_user', {
    params:{
      email : data.email
    }
  });
}
