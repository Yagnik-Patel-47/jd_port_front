import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface About {
  title: string;
  description: { children: { marks: string[]; text: string }[] }[];
}

const initialState: About = {
  title: "",
  description: [],
};

const profileSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setAboutData: (state, payload: PayloadAction<About>) => {
      state.title = payload.payload.title;
      state.description = payload.payload.description;
    },
  },
});

export const { setAboutData } = profileSlice.actions;
export default profileSlice.reducer;
