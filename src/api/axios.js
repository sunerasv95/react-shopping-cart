import axios from "axios";

const BASE_URL = 'https://my-json-server.typicode.com/';

export default axios.create({
    baseURL: BASE_URL
});

