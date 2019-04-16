import api from './axiosInstance';

export const getCreditSession = () => {
  return api.get('/store/charge', {timeout:1000*10});
}

export const placeOrder = (authorization_token) => {
  return api.put('/store/place_order', {
    auth_token: authorization_token
  })
}

export function addProdToLocalStorage(prod) {
  const cart = JSON.parse(localStorage.getItem('cart'));
  console.log(cart)
  var cartProduct = cart.find( product => product.product_id === prod.product_id)
  
  if (cartProduct){
    cartProduct.quantity++
    localStorage.setItem('cart', JSON.stringify(cart));
  
  } else {
    cart.push({ product_id: prod.product_id , quantity: 1})
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

