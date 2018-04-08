import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-xugetsu.firebaseio.com/'
});

export default instance;