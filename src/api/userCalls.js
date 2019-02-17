import api from './axiosInstance';

export const getUser = data => {
  return api.get('/', {
    params:{
      email : data.email
    }
  });
}
