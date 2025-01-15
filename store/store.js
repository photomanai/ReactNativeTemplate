import { configureStore } from "@reduxjs/toolkit";
import reducerSclice from "./slice/templateSclice";

export const store = configureStore({
  reducer: {
    template: reducerSclice,
  },
});
