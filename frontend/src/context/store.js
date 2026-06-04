// store/store.js

import { configureStore } from "@reduxjs/toolkit";

import examReducer from "./slices/examSlice";
import classReducer from "./slices/classSlice";
import marksheetReducer from "./slices/marksheetSlice";
import formatReducer from "./slices/formatSlice";

export const store = configureStore({
  reducer: {
    exam: examReducer,
    class: classReducer,
    marksheet: marksheetReducer,
    format: formatReducer
  },
});