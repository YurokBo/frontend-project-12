import axios from 'axios';
import { apiMethods, apiPaths } from '../../helpers/routes';

export const login = ({ username, password }) => {
  try {
    return axios.request({
      method: apiMethods.post,
      url: apiPaths.loginPath(),
      data: {
        username,
        password,
      },
    });
  } catch (error) {
    throw Error(error);
  }
};

export const signup = ({ username, password }) => {
  try {
    return axios.request({
      method: apiMethods.post,
      url: apiPaths.signupPath(),
      data: {
        username,
        password,
      },
    });
  } catch (error) {
    throw Error(error);
  }
};
