/* A library that is used to make http requests. */
// import ky from 'ky';
import axios from 'axios';
import {apiUrl} from '../config';

const instance = axios.create({
  baseURL: apiUrl,
});

instance.interceptors.request.use((config:any) => {
  return config;
});

export default instance;
