import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'

const deliveryApi = axios.create({
  baseURL: 'https://ds151-api.herokuapp.com/'
});

deliveryApi.interceptors.request.use(
  async (config) => {
    const access_token = await AsyncStorage.getItem('access_token');
    if(access_token){
      config.headers.Authorization = access_token;
    }
    return(config);
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default deliveryApi;