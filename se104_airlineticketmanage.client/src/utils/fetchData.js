import axios from "axios";

const target = "https://localhost:7145";

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`${target}/${url}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`${target}/${url}`, post, {
    headers: {
      Authorization: "Bearer " + token,
      'Allow-Control-Allow-Origin': '*'
    },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`${target}/${url}`, post, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res;
};

export const patchDataAPI = async (url, post) => {
  const res = await axios.patch(`${target}/${url}`, post);
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`${target}/${url}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res;
};
