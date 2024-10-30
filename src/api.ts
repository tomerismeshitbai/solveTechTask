import axios from 'axios';

const API_URL = 'https://swapi.dev/api';

export const fetchPeople = (page: number) => {
  return axios.get(`${API_URL}/people/?page=${page}`);
};

export const fetchPlanets = (page: number) => {
  return axios.get(`${API_URL}/planets/?page=${page}`);
};

export const fetchStarships = (page: number) => {
  return axios.get(`${API_URL}/starships/?page=${page}`);
};

export const fetchEntityDetail = (entity: string, id: string) => {
  return axios.get(`${API_URL}/${entity}/${id}`);
};