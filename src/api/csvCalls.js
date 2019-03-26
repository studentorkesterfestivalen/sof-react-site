import api from './axiosInstance';

export const getOrchestraCSV = (id) =>{
  return api.get('/orchestra/' + id + '/all_signups', {timeout: 0});
}

export const getAnniversaryCSV = (id) =>{
  return api.get('/orchestra/anniversary/', {timeout: 0});
}

