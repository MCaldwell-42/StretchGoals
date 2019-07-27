import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getRoutineStretches = routineId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/routineStretches.json?orderBy="routineId"&equalTo="${routineId}"`)
    .then((results) => {
      const routineStretchResults = results.data;
      const routineStretches = [];
      if (routineStretchResults !== null) {
        Object.keys(routineStretchResults).forEach((routineStretchId) => {
          routineStretchResults[routineStretchId].id = routineStretchId;
          routineStretches.push(routineStretchResults[routineStretchId]);
        });
      }
      console.error(routineStretches);
      resolve(routineStretches);
    })
    .catch(err => reject(err));
});

const getRoutineStretchId = (stretchId, routineId) => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/routineStretches.json?orderBy="routineId"&equalTo="${routineId}"`)
    .then((results) => {
      const routineStretchResults = results.data;
      const routineStretches = [];
      if (routineStretchResults !== null) {
        Object.keys(routineStretchResults).forEach((routineStretchId) => {
          routineStretchResults[routineStretchId].id = routineStretchId;
          routineStretches.push(routineStretchResults[routineStretchId]);
        });
      }
      const deathRow = routineStretches.filter(stretch => stretch.stretchId === stretchId);
      console.error(deathRow);
      resolve(deathRow);
    })
    .catch(err => reject(err));
});

const addRoutineStretch = newStretch => axios.post(`${firebaseUrl}/routineStretches.json`, newStretch);

export default { getRoutineStretches, addRoutineStretch, getRoutineStretchId };
