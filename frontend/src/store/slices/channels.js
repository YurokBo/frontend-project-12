import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    activeChannel: {
      name: '',
      id: '',
      removable: false
    },
    activeChannelId: null,
  },
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    setActiveChannel(state, { payload }) {
      state.activeChannel = payload;
    },
    setActiveChannelId(state, { payload }) {
      state.activeChannelId = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload.data);
    },
  }
});

export const { actions, reducer } = slice;
