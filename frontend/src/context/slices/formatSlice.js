// store/slices/examSlice.js

import { createSlice } from "@reduxjs/toolkit";

const formatSlice = createSlice({
  name: "format",
  initialState: {
    format: "individual",
    subject: "",
    class: "",
  },

  reducers: {
    setFormatValue: (state, action) => {
      state.format = action.payload.format;
    },
    setFormatSubject: (state, action) => {
      state.subject = action.payload.subject;
    },
    setFormatClass: (state, action) => {
      state.class = action.payload.class;
    },

    clearFormat: () => {
      return null;
    },
  },
});

export const { setFormatValue, clearFormat } = formatSlice.actions;
export default formatSlice.reducer;
