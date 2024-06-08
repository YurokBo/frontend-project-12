import { configureStore } from "@reduxjs/toolkit";
import { reducer as authReducer, actions as authActions } from "./slices/auth";
import { reducer as channelsReducer, actions as channelsActions } from "./slices/channels";
import { channelsApi } from "./services/channelsApi";

export const actions = {
  ...authActions,
  ...channelsActions,
}

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware),
})
