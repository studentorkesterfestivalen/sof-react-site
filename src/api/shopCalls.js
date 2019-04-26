import api from './axiosInstance';

export const createStripePayment = (token_id) => {
  return api.post('/store/charge',
   {
     stripe_token: token_id,
     timeout:1000*10
   }
 );
}

export const placeOrder = (authorization_token) => {
  return api.put('/store/place_order', {
    auth_token: authorization_token,
    timeout: 1000*5
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
