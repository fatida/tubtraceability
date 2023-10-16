import axios, { AxiosInstance } from 'axios';
import config from '../../config/config';

const instance: AxiosInstance = axios.create({
  baseURL: config.baseURL,
  withCredentials: false,
});

export default instance;