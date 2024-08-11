import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    activeChannel: {
      name: '',
      id: '',
      removable: false,
    },
    activeChannelId: null,
    channelsNames: [],
    inc: 0,
  },
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    setActiveChannel(state, { payload }) {
      state.activeChannel = { ...payload };
    },
    setActiveChannelId(state, { payload }) {
      state.activeChannelId = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    setChannelsNames(state, { payload }) {
      state.channelsNames.push(payload);
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
