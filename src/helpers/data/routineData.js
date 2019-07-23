import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getRoutines = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/routines.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const routineResults = results.data;
      const routines = [];
      if (routineResults !== null) {
        Object.keys(routineResults).forEach((routineId) => {
          routineResults[routineId].id = routineId;
          routines.push(routineResults[routineId]);
        });
      }
      resolve(routines);
    })
    .catch(err => reject(err));
});

const deleteRoutine = routineId => axios.delete(`${firebaseUrl}/routines/${routineId}.json`);

// const getSingleRoutine = routineId => axios.get(`${firebaseUrl}/routines/${routineId}.json`);

const postRoutine = newRoutine => axios.post(`${firebaseUrl}/routines.json`, newRoutine);

const putScat = (updatedScat, scatId) => axios.put(`${firebaseUrl}/scats/${scatId}.json`, updatedScat);

export default {
  getRoutines, deleteRoutine, postRoutine, putScat,
};
// getSingleScat
