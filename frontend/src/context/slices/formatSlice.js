// store/slices/examSlice.js

import { createSlice } from "@reduxjs/toolkit";

const formatSlice = createSlice({
  name: "format",
  initialState: "PT1",

  reducers: {
    setFormatValue: (state, action) => {
      return action.payload;
    },

    clearFormat: () => {
      return null;
    },
  },
});

export const { setFormatValue, clearFormat } = formatSlice.actions;
export default formatSlice.reducer;