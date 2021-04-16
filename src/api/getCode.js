import axios from '../axios/index';

export default {
  getCode(email) {
    return axios.post('/passport/getCode', {
      email,
    });
  },
};
