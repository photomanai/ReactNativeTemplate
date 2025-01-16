import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  selectedTemplate: null,
  textColor: "#FFFFFF",
  fontSize: 18,
  fontFamily: "Arial",
  templates: [
    { id: 1, image: require("../../assets/WeddingCart.png") },
    { id: 2, image: require("../../assets/WeddingCart2.png") },
  ],
  isSaving: false,
  isSharing: false,
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
      state.textColor = "#FFFFFF";
      state.fontSize = 18;
      state.fontFamily = "Arial";
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    setIsSaving: (state, action) => {
      state.isSaving = action.payload;
    },
    setIsSharing: (state, action) => {
      state.isSharing = action.payload;
    },
  },
});

export const {
  setText,
  setSelectedTemplate,
  setTextColor,
  setFontSize,
  setFontFamily,
  setIsSaving,
  setIsSharing,
} = templateSlice.actions;

export default templateSlice.reducer;
