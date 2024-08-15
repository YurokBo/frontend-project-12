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
  },
  reducers: {
    setChannels(state, { payload }) {
      return {
        ...state,
        channels: payload,
      };
    },
    setActiveChannel(state, { payload }) {
      return {
        ...state,
        activeChannel: payload,
      };
    },
    setActiveChannelId(state, { payload }) {
      return {
        ...state,
        activeChannelId: payload,
      };
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
