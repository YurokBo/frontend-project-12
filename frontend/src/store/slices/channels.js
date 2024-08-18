import { createSlice } from '@reduxjs/toolkit';
import { channelsApi } from '../services/channelsApi';

export const slice = createSlice({
  name: 'channels',
  initialState: {
    activeChannelId: null,
  },
  reducers: {
    setActiveChannelId: (state, { payload }) => ({
      ...state,
      activeChannelId: payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.getChannels.matchFulfilled,
      (state, { payload }) => ({
        ...state,
        activeChannelId: payload[0].id,
      }),
    ).addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, { payload: { id } }) => ({
        ...state,
        activeChannelId: id,
      }),
    );
  },
});

export const { actions } = slice;

export default slice.reducer;
