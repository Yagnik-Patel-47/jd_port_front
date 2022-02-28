import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme";
import workDataReducer from "./workData";
import aboutReducer from "./about";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    workData: workDataReducer,
    about: aboutReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
