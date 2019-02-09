import api from './axiosInstance';

export const postInfo = info => {
  return api.post('/somethign', {
    data: {
      //info.asdf
      //info.asdf
    }
  });
}

export const sendCode = code => {
  return api.post('/orchestra_signup/verify', {
    data: code
  });
}

/* export const getAllOrchestras = () => {
  return api.get('/orchestra/all_orchestras');
}

export const getAllOrchestraSignUps = id => {
  return api.get(`/orchestra/${id}/all_signups`);
}

 */