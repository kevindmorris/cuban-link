import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressObject } from "../../common/types";
import { Api } from "../../services/Api";

interface State {
  status: "idle" | "loading" | "successed" | "failed";
  base: AddressObject | null;
}

const initialState: State = {
  status: "idle",
  base: null,
};

const api = new Api();

export const getAddress = createAsyncThunk(
  "address/getAddress",
  async (id: string) => {
    try {
      const response = await api.getAddress(id);
      return response;
    } catch (error) {
      console.log(error);
      return initialState.base;
    }
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAddress.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.base = action.payload;
      state.status = "idle";
    });
    builder.addCase(getAddress.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const {} = addressSlice.actions;

export default addressSlice.reducer;
