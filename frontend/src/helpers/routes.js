const API_PATH = '/api/v1';

export const routes = {
  rootPage: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
  notFoundPage: () => '*',
};

export const apiPaths = {
  loginPath: () => `${API_PATH}/login`,
  signupPath: () => `${API_PATH}/signup`,
  channelsPath: () => `${API_PATH}/channels`,
  messagesPath: () => `${API_PATH}/messages`,
};

export const apiMethods = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  patch: 'PATCH',
};
