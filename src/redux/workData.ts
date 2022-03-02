import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Work {
  title: string;
  description: { children: { marks: string[]; text: string }[] }[];
  media: { src: string; type: string }[];
  id: string;
  placeholder: null | string;
  tools: string[];
}

const initialState: Work = {
  title: "",
  description: [],
  id: "",
  tools: [],
  media: [],
  placeholder: "",
};

const workDataSlice = createSlice({
  name: "workData",
  initialState,
  reducers: {
    setWorkData: (state, payload: PayloadAction<Work>) => {
      state.title = payload.payload.title;
      state.description = payload.payload.description;
      state.id = payload.payload.id;
      state.media = payload.payload.media;
      state.tools = payload.payload.tools;
      state.placeholder = payload.payload.placeholder;
    },
  },
});

export const { setWorkData } = workDataSlice.actions;
export default workDataSlice.reducer;
