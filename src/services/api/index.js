import axios from 'axios';

const api = axios.create({
    baseURL: "https://serverappmemprendedoras-production.up.railway.app",

})


export default api;