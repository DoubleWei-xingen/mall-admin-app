import axios from '../axios/index';

export default {
  logon(params) {
    const {
      email, password, username, code, role,
    } = params;
    return axios.post('/passport/logon', {
      email,
      password,
      username,
      code,
      role,
    });
  },
};
