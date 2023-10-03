import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import blockSlice from "./slices/blockSlice";
import addressSlice from "./slices/addressSlice";
import transactionSlice from "./slices/transactionSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    address: addressSlice,
    block: blockSlice,
    transaction: transactionSlice,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
