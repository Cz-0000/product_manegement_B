import axios from '@/axios';

export default {
  login (params) {
    return axios.post('/passport/login', params);
  },
  registor (params) {
    return axios.post('/passport/logon', params);
  },
  getCode (params) {
    return axios.post('/passport/getCode', params);
  }
};
