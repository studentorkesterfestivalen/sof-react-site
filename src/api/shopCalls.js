import api from './axiosInstance';

export const getCreditSession = () => {
  return api.get('/store/charge');
}
