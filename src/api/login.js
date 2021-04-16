import axios from '../axios/index';

export default {
  login(params) {
    const {
      email, password,
    } = params;
    return axios.post('/passport/login', {
      email,
      password,
    });
  },
};
