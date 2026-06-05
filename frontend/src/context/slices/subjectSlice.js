// store/slices/subjectSlice.js

import { createSlice } from "@reduxjs/toolkit";

const subjectSlice = createSlice({
  name: "subject",
  initialState: "PT1",

  reducers: {
    setSubjectValue: (state, action) => {
      return action.payload;
    },

    clearSubject: () => {
      return null;
    },
  },
});

export const { setSubjectValue, clearSubject } = subjectSlice.actions;
export default subjectSlice.reducer;