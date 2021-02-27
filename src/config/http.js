/* eslint-disable no-param-reassign */
import axios from 'axios';
import { baseURL } from '../../app.json'
import { store } from '../store';

const http = axios.create({
  baseURL,
});

http.interceptors.request.use(
  async (config) => {
    const { token } = store.getState().auth;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;
