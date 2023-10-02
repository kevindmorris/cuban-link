import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import blockSlice from "./slices/blockSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    block: blockSlice,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
