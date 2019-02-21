import api from './axiosInstance';

export const postInfo = info => {
    console.log('this is info in postInfo: ');
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
      orchestra_ticket_attributes : { kind : info.festivalPackage },
      orchestra_food_ticket_attributes : {  kind : info.foodTickets},
      orchestra_articles_attributes : [
        {  kind : 0,  data : info.numTshirt },
        {  kind : 1,  data : info.numMedal },
        {  kind : 2,  data : info.numPatch }
      ],
      special_diets_attributes : [
        {  name : info.allergies }
      ]
    },
    code: info.code
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
