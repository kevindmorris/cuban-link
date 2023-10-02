import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { BlockObject } from "../../common/types";
import { Api } from "../../services/Api";

interface State {
  status: "idle" | "loading" | "successed" | "failed";
  block: BlockObject | null;
}

const initialState: State = {
  status: "idle",
  block: null,
};

const api = new Api();

export const getBlock = createAsyncThunk(
  "block/getBlock",
  async ({ hash }: { hash: string }) => {
    try {
      const response = await api.getBlock(hash);
      return response;
    } catch (error) {
      console.log(error);
      return initialState.block;
    }
  }
);

export const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlock.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getBlock.fulfilled, (state, action) => {
      state.block = action.payload;
      state.status = "idle";
    });
    builder.addCase(getBlock.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const {} = blockSlice.actions;

export default blockSlice.reducer;
