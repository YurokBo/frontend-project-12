import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: JSON.parse(localStorage.getItem('user')) || { username: null, token: null },
  reducers: {
    setUser(state, { payload }) {
      const { username, token } = payload;
      localStorage.setItem('user', JSON.stringify({ username, token }));

      state.username = username;
      state.token = token;

      return payload;
    },
    removeUser(state) {
      localStorage.removeItem('user');
      state.username = null;
      state.token = null;
    },
  },
});

export const { actions, reducer } = slice;
