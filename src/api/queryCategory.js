import axios from '@/axios/index';

export default {
  getCategory(params) {
    return axios.get('/category/all', {
      params,
    });
  },
  editCategory(params) {
    return axios.put('/category/edit', params);
  },
  addCategory(params) {
    return axios.get('/category/add', {
      params,
    });
  },
  deleteCategory(params) {
    return axios.delete(`/category/${params}`);
  },
};
