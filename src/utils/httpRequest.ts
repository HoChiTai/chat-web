import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:8321/api',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8321',
  },
});

export default request;
