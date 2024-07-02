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
    throw Error(error)
  }
}

export const signup = ({ username, password }) => {
  try {
    return axios.request({
      method: 'post',
      url: `${API_PATH}/signup`,
      data: {
        username,
        password
      }
    })
  } catch (error) {
    throw Error(error)
  }
}
