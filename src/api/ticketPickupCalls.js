import api from './axiosInstance';

export const getOrderItemsFromUUID = data => {
  return api.get('/collect/' + data, { timeout : 1000 * 10 });
}

export const collectItems = ids => {
  return api.post('/collect', {
    collected_ids: ids
   });
}