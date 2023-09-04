import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '38406693-dc9f858473ae6436eca73fc0b';

const params = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
});

export const fetchQuery = async (query, page) => {
  const resp = await axios.get(`/?q=${query}&page=${page}&${params}`);
  return resp.data;
};
