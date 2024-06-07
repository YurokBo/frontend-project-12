import axios from "axios";

export const API_PATH = '/api/v1';

export const login = ({ username, password }) => {
  try {
    return axios.request({
      method: 'post',
      url: `${API_PATH}/login`,
      data: {
        username,
        password
      }
    })
  } catch (error) {
    console.log(error)
    throw Error(error)
  }
}
