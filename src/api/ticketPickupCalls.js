import api from './axiosInstance';

export const getOrderItemsFromUUID = data => {
  return api.get('/collect/' + data, { timeout : 1000 * 10 });
}