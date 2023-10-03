import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionObject } from "../../common/types";
import { Api } from "../../services/Api";

interface State {
  status: "idle" | "loading" | "successed" | "failed";
  transaction: TransactionObject | null;
}

const initialState: State = {
  status: "idle",
  transaction: null,
};

const api = new Api();

export const getTransaction = createAsyncThunk(
  "transaction/getTransaction",
  async ({ hash }: { hash: string }) => {
    try {
      const response = await api.getTransaction(hash);
      return response;
    } catch (error) {
      console.log(error);
      return initialState.transaction;
    }
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransaction.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getTransaction.fulfilled, (state, action) => {
      state.transaction = action.payload;
      state.status = "idle";
    });
    builder.addCase(getTransaction.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const {} = transactionSlice.actions;

export default transactionSlice.reducer;
