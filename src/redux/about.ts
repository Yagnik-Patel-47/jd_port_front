import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface About {
  logo: string;
  title: string;
  description: { children: { marks: string[]; text: string }[] }[];
}

const initialState: About = {
  logo: "",
  title: "",
  description: [],
};

const profileSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setAboutData: (state, payload: PayloadAction<About>) => {
      state.logo = payload.payload.logo;
      state.title = payload.payload.title;
      state.description = payload.payload.description;
    },
  },
});

export const { setAboutData } = profileSlice.actions;
export default profileSlice.reducer;
