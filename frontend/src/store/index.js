import { configureStore } from "@reduxjs/toolkit";
import { reducer as authReducer, actions as authActions } from "./slices/auth";

export const actions = {
  ...authActions
}

export default configureStore({
  reducer: {
    auth: authReducer,
  }
})
