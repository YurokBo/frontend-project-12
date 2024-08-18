import { createSlice } from '@reduxjs/toolkit';

const defaultStateData = {
  isModalOpened: false,
  modalTitle: null,
  componentName: null,
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
        componentName,
        channelId,
        modalTitle,
      },
    }) => ({
      ...state,
      isModalOpened: true,
      componentName,
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
