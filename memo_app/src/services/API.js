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

// 메모 갱신
export const getMemos = () => {
  return axiosApi.get(memos);
}

export const addMemo = (title, content) => {
  return axiosApi.post(memos, {
    title: title,
    content: content
  });
}

// 하나의 메모 습득
export const getMemo = (id) => {
  return axiosApi.get(memos + '/' + id);
}

export const updateMemo = (id, title, content) => {
  return axiosApi.put(memos + '/' + id, {
    title: title,
    content: content
  });
}

export const deleteMemo = (id) => {
  return axiosApi.delete(memos + '/' + id);
}

export const getLabels = () => {
  return axiosApi.get(labels);
}

export const getLabel = (id) => {
  return axiosApi.get(labels + '/' + id);
}

export const addLabel = (title) => {
  return axiosApi.post(labels, {
    title: title
  });
}

export const deleteLabel = (id) => {
  return axiosApi.delete(labels + '/' + id);
}

// 메모 설정
export const setLabel = (id, data) => {
  const param = { memoIds : data };
  const jsonParam = JSON.stringify(param);
  return axiosApi.post(labels + '/' + id + '/' + memos, jsonParam);
}

// 선택된 메모 삭제 
export const deleteMemos = (labelId, memoIds) => {
  const param = { memoIds : memoIds};
  const jsonParam = JSON.stringify(param);
  return axiosApi.post(labels + '/' + labelId + '/' + memos, jsonParam);
}
  