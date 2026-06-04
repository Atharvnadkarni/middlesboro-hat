// store/slices/examSlice.js

import { createSlice } from "@reduxjs/toolkit";

const examSlice = createSlice({
  name: "exam",
  initialState: "PT1",

  reducers: {
    setExamValue: (state, action) => {
      return action.payload;
    },

    clearExam: () => {
      return null;
    },
  },
});

export const { setExamValue, clearExam } = examSlice.actions;
export default examSlice.reducer;