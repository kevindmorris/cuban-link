import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { BlockObject } from "../../common/types";
import { Api } from "../../services/Api";

interface State {
  status: "idle" | "loading" | "successed" | "failed";
  base: BlockObject | null;
}

const initialState: State = {
  status: "idle",
  base: null,
};

const api = new Api();

export const getBlock = createAsyncThunk(
  "block/getBlock",
  async (id: string) => {
    try {
      const response = await api.getBlock(id);
      return response;
    } catch (error) {
      console.log(error);
      return initialState.base;
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
      state.base = action.payload;
      state.status = "idle";
    });
    builder.addCase(getBlock.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const {} = blockSlice.actions;

export default blockSlice.reducer;
