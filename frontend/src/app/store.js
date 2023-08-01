import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../middleware/addSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
