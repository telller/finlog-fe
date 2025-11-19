import axios from './axios.service';

export const getTagsList = () => axios.get('http://localhost:3000/api/v1/tag/list');
