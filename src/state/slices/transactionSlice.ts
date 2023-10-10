import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionObject } from "../../common/types";
import { Api } from "../../services/Api";

interface State {
  status: "idle" | "loading" | "successed" | "failed";
  base: TransactionObject | null;
}

const initialState: State = {
  status: "idle",
  base: null,
};

const api = new Api();

export const getTransaction = createAsyncThunk(
  "transaction/getTransaction",
  async (id: string) => {
    try {
      const response = await api.getTransaction(id);
      return response;
    } catch (error) {
      console.log(error);
      return initialState.base;
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
      state.base = action.payload;
      state.status = "idle";
    });
    builder.addCase(getTransaction.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const {} = transactionSlice.actions;

export default transactionSlice.reducer;
