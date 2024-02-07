import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com/',
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default instance;
