import api from './axiosInstance';

export const getCreditSession = () => {
  return api.get('/store/charge');
}

export const placeOrder = (authorization_token) => {
  return api.put('/store/place_order', {
    auth_token: authorization_token
  })
}
