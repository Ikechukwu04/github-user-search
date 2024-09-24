import axios from 'axios';

const BASE_URL = 'https://api.github.com/users';

export const fetchAdvancedUserData = async (username, location, repos) => {
  const response = await axios.get(`${BASE_URL}/${username}?q=${query}&page=${page}`);
  let query = username ? `${username} in:login` : '';
  if (location) {
    query += ` location:${location}`;
  }
  
  if (repos) {
    query += ` repos:>${repos}`;
  }
  return response.data;
};
