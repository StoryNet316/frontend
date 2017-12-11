import axios from 'axios';
import { processJSON } from '../database/queries';
const serverURL =  "http://localhost:8080";

export function getSentiment(text, cb) {
  axios.get(`${serverURL}/entity`, { 
    params: {
      text: text 
    }
  }).then(function (response) {
    if (response.status == 200) {
      console.log(response.data)
      cb(response.data)
    }
  }).catch(function (error) {
    console.log(error)
  })
}

