import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getBodyParts = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/bodyparts.json`)
    .then((results) => {
      const bodyPartResults = results.data;
      const bodyparts = [];
      if (bodyPartResults !== null) {
        Object.keys(bodyPartResults).forEach((bodypartId) => {
          bodyPartResults[bodypartId].id = bodypartId;
          bodyparts.push(bodyPartResults[bodypartId]);
        });
      }
      resolve(bodyparts);
    })
    .catch(err => reject(err));
});

export default { getBodyParts };
