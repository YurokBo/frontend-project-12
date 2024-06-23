import { configureStore } from "@reduxjs/toolkit";
import { reducer as authReducer, actions as authActions } from "./slices/auth";
import { reducer as channelsReducer, actions as channelsActions } from "./slices/channels";
import { channelsApi } from "./services/channelsApi";
import { messagesApi } from "./services/messagesApi";

export const actions = {
  ...authActions,
  ...channelsActions,
}

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    // messages: messagesReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([
      channelsApi.middleware,
      messagesApi.middleware,
    ]),
})
