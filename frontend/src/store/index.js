import { configureStore } from '@reduxjs/toolkit';
import authReducer, { actions as authActions } from './slices/auth';
import channelsReducer, { actions as channelsActions } from './slices/channels';
import modalReducer, { actions as modalActions } from './slices/modalSlice';
import { channelsApi } from './services/channelsApi';
import { messagesApi } from './services/messagesApi';

export const actions = {
  ...authActions,
  ...channelsActions,
  ...modalActions,
};

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    modal: modalReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([
      channelsApi.middleware,
      messagesApi.middleware,
    ]),
});
