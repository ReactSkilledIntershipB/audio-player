import { observable } from 'mobx';
import axios from 'axios';

import { CORS_ALLOW_URL, BASE_URL } from '../config/api_config';

export class Model {
    @observable data = [];

    getAPIBaseURL = `${CORS_ALLOW_URL}${BASE_URL}`;

    getData = (apiQuery) => {
      return axios.get(`${this.getAPIBaseURL}${apiQuery}`)
        .then(res => {
            console.log(res.data);
            this.data = res.data.data;
        })
        .catch(err => console.log(err));
    }
}
