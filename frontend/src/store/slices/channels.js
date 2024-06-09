import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'channels',
  initialState: {channels: []},
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
  }
});

export const { actions, reducer } = slice;
