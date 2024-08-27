import { createSlice } from '@reduxjs/toolkit';

const defaultStateData = {
  isModalOpened: false,
  modalTitle: null,
  type: null,
  channelId: null,
};

export const slice = createSlice({
  name: 'modalSlice',
  initialState: {
    ...defaultStateData,
  },
  reducers: {
    openModal: (state, {
      payload: {
        type,
        channelId,
        modalTitle,
      },
    }) => ({
      ...state,
      isModalOpened: true,
      type,
      channelId,
      modalTitle,
    }),
    closeModal: (state) => ({
      ...state,
      ...defaultStateData,
    }),
  },
});

export const { actions } = slice;

export default slice.reducer;
