import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { mode: "light" | "dark" } = {
  mode: "dark",
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
