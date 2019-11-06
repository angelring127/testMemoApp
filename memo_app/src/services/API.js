import axios from 'axios';

const baseURL = 'http://localhost:3000/';
const memos = 'memos';
const labels = 'labels';
const axiosApi = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
})


export const getMemos = () => {
  return axios.get(baseURL + memos);
}

export const addMemo = (title, content) => {
  return axios.post(baseURL + memos, {
    title: title,
    content: content
  });
}

export const getMemo = (id) => {
  return axios.get(baseURL + memos + '/' + id);
}

export const updateMemo = (id, title, content) => {
  return axios.put(baseURL + memos + '/' + id, {
    title: title,
    content: content
  });
}

export const deleteMemo = (id) => {
  return axios.delete(baseURL + memos + '/' + id);
}

export const getLabels = () => {
  return axios.get(baseURL + labels);
}

export const getLabel = (id) => {
  return axios.get(baseURL + labels + '/' + id);
}

export const addLabel = (title) => {
  return axios.post(baseURL + labels, {
    title: title
  });
}

export const deleteLabel = (id) => {
  return axios.delete(baseURL + labels + '/' + id);
}

export const setLabel = (id, data) => {
  const param = { memoIds : data };
  const jsonPram = JSON.stringify(param);
  return axiosApi.post(labels + '/' + id + '/' + memos, jsonPram);
}
  