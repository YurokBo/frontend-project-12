import { createSlice } from '@reduxjs/toolkit';

const defaultUserData = { username: null, token: null };

const slice = createSlice({
  name: 'auth',
  initialState: JSON.parse(localStorage.getItem('user')) || { ...defaultUserData },
  reducers: {
    setUser(state, { payload }) {
      const { username, token } = payload;
      localStorage.setItem('user', JSON.stringify({ username, token }));

      return {
        ...state,
        username,
        token,
      };
    },
    setDefaultUserData(state) {
      localStorage.removeItem('user');

      return {
        ...state,
        ...defaultUserData,
      };
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
