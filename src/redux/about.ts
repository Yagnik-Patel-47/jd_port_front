import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface About {
  light_logo: string;
  dark_logo: string;
  title: string;
  description: { children: { marks: string[]; text: string }[] }[];
}

const initialState: About = {
  light_logo: "",
  dark_logo: "",
  title: "",
  description: [],
};

const profileSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setAboutData: (state, payload: PayloadAction<About>) => {
      state.light_logo = payload.payload.light_logo;
      state.dark_logo = payload.payload.dark_logo;
      state.title = payload.payload.title;
      state.description = payload.payload.description;
    },
  },
});

export const { setAboutData } = profileSlice.actions;
export default profileSlice.reducer;
