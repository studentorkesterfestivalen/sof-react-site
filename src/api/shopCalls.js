import api from './axiosInstance';

export const getCreditSession = () => {
  return api.get('/store/charge', {timeout:1000*10});
}

export const placeOrder = (authorization_token) => {
  return api.put('/store/place_order', {
    auth_token: authorization_token
  })
}

export const addItemToCart = (prodID) => {
  return api.put('/shopping_cart', {
    product_item: prodID
  })
}

