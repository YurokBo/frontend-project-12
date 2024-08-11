import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: JSON.parse(localStorage.getItem('user')) || { username: null, token: null },
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
    removeUser(state) {
      localStorage.removeItem('user');

      return {
        ...state,
        username: null,
        token: null,
      };
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
