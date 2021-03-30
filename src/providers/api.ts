import axios from 'axios';
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

export const api = axios.create({
  baseURL: 'https://6062705a0133350017fd1090.mockapi.io/',
  adapter: !axios.defaults.adapter ? undefined : throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter)),
});
