import axios from 'axios';

const baseURL = 'http://localhost:3000/';

export function getMemos() {
  return axios.get(baseURL + 'memos');
}

export function getLabels() {
  return axios.get(baseURL + 'labels');
}