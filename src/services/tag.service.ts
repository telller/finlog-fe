import axios from './axios.service';

export const getTagsList = () => axios.get('/tag/list');
