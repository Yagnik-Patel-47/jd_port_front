import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { mode: "light" | "dark" } = {
  mode: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
};

const profileSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeMode: (state, payload: PayloadAction<"light" | "dark">) => {
      state.mode = payload.payload;
    },
  },
});

export const { changeMode } = profileSlice.actions;
export default profileSlice.reducer;
