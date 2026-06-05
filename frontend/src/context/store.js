// store/store.js

import { configureStore } from "@reduxjs/toolkit";

import examReducer from "./slices/examSlice";
import classReducer from "./slices/classSlice";
import marksheetReducer from "./slices/marksheetSlice";
import formatReducer from "./slices/formatSlice";
import subjectReducer from "./slices/subjectSlice";

export const store = configureStore({
  reducer: {
    exam: examReducer,
    subject: subjectReducer,
    class: classReducer,
    marksheet: marksheetReducer,
    format: formatReducer
  },
});