import api from './axiosInstance';

export const postInfo = info => {
    console.log(info);
  return api.post('/orchestra_signup', {
    item: {
      dormitory: info.dorm,
      active_member: info.oldOrActive,
      arrival_date: info.arriveDay,
      consecutive_10: info.tenInARow,
      other_performances: info.otherPerformances,
      attended_25: info.twoFive,
      orchestra_role: info.orchestraType,
      instrument_size: info.instrSize,
      orchestra_ticket_attributes : [
        { kind : info.festivalPackage }
      ],
      orchestra_food_ticket_attributes : [
        {  kind : info.foodTicketsPackage }
      ],
      orchestra_articles_attributes : [
        {  kind : "patch",  data : info.numPatch },
        {  kind : "medal",  data : info.numMedal },
        {  kind : "t-shirt",  data : info.numTshirt }
      ],
      special_diets_attributes : [
        {  name : info.allergies }
      ]
    },
    code: info.code
  });
}

export const sendCode = input => {
  console.log(input);
  return api.get('/orchestra_signup/verify', {
    params:{
    code : input
  }
  });
}

export const createOrchestra = orchestra => {
  return api.post('/orchestra', {
    data : orchestra
  })
}



/* export const getAllOrchestras = () => {
  return api.get('/orchestra/all_orchestras');
}

export const getAllOrchestraSignUps = id => {
  return api.get(`/orchestra/${id}/all_signups`);
}

 */
