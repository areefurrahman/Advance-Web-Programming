import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/areefurrahman/linear-clone-api',
});

export default api;