import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getStretches = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/stretches.json`)
    .then((results) => {
      const stretchResults = results.data;
      const stretches = [];
      if (stretchResults !== null) {
        Object.keys(stretchResults).forEach((stretchId) => {
          stretchResults[stretchId].id = stretchId;
          stretches.push(stretchResults[stretchId]);
        });
      }
      resolve(stretches);
    })
    .catch(err => reject(err));
});

const getStretchesByBodyPart = bodyPartId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/stretches.json?orderBy="bodyPartId"&equalTo="${bodyPartId}"`)
    .then((results) => {
      const stretchResults = results.data;
      const stretches = [];
      if (stretchResults !== null) {
        Object.keys(stretchResults).forEach((stretchId) => {
          stretchResults[stretchId].id = stretchId;
          stretches.push(stretchResults[stretchId]);
        });
      }
      resolve(stretches);
      console.error(stretches);
    })
    .catch(err => reject(err));
});

const routineStretches = filteredStretches => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/stretches.json`)
    .then((results) => {
      const stretchResults = results.data;
      const filterResults = [];
      const stretches = [];
      if (stretchResults !== null) {
        Object.keys(stretchResults).forEach((stretchId) => {
          stretchResults[stretchId].id = stretchId;
          stretches.push(stretchResults[stretchId]);
        });
        filteredStretches.forEach((fstretch) => {
          let filteredStretch = stretches.filter(stretch => stretch.id === fstretch.stretchId);
          [filteredStretch] = filteredStretch;
          const smashed = {
            ...filteredStretch,
            ...fstretch,
            stretchId: filteredStretch.id,
          };
          filterResults.push(smashed);
        });
      }
      console.error(filterResults);
      resolve(filterResults);
    })
    .catch(err => reject(err));
});

const getSingleStretch = stretchId => axios.get(`${firebaseUrl}/stretches/${stretchId}.json`);

export default {
  getStretches, getSingleStretch, routineStretches, getStretchesByBodyPart,
};
