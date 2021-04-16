import axios from '@/axios/index';

export default {
  queryproduct(params) {
    return axios.get('/products/all', {
      params,
    });
  },
  deleteProduct(params) {
    return axios.delete(`/products/${params.id}`);
  },
  addProduct(params) {
    return axios.post('/products/add', params);
  },
  pollingProduct(params) {
    return axios.get(`/products/${params}`);
  },
  editProduct(params) {
    return axios.put('/products/edit', params);
  },
};
