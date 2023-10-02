import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface State {
  darkMode: boolean;
}

const initialState: State = {
  darkMode: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleTheme } = userSlice.actions;

export default userSlice.reducer;
