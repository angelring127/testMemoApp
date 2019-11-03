import axios from 'axios';

const baseURL = 'http://localhost:3000/';
const memos = 'memos';
const labels = 'labels';

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

export const addLabel = (title) => {
  return axios.post(baseURL + labels, {
    title: title
  });
}

export const deleteLabel = (id) => {
  return axios.delete(baseURL + labels + '/' + id);
}