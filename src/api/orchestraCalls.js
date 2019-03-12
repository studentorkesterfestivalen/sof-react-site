import api from './axiosInstance';

export const createOrchestraSignup = info => {
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
        {  kind : 0,  data : info.numTshirt, size : info.sizeTshirt },
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

export const getOrchestraSignup = id => {
  return api.get('/orchestra_signup/' + id);
}
export const deleteOrchestraSignup = id => {
  return api.delete('/orchestra_signup/' + id);
}

export const updateOrchestraSignup = (id, info) => {
  return api.put('/orchestra_signup/' + id, {
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
        {  kind : 0,  data : info.numTshirt, size : info.sizeTshirt, id: info.ThsirtID },
        {  kind : 1,  data : info.numMedal, id: info.MedalID},
        {  kind : 2,  data : info.numPatch, id: info.PatchID}
      ],
      special_diets_attributes : [
        {  name : info.allergies, id: info.allergyId}
      ]
    },
  });
}

export const getOrchestra = id => {
  return api.get('/orchestra/' + id);
}


/* export const getAllOrchestras = () => {
  return api.get('/orchestra/all_orchestras');
}

export const getAllOrchestraSignUps = id => {
  return api.get(`/orchestra/${id}/all_signups`);
}

 */
