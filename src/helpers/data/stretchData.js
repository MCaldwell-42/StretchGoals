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
      console.error(stretches);
    })
    .catch(err => reject(err));
});

const getSingleStretch = stretchId => axios.get(`${firebaseUrl}/stretches/${stretchId}.json`);

export default {
  getStretches, getSingleStretch,
};
