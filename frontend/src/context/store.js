// store/store.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import examReducer from "./slices/examSlice";
import classReducer from "./slices/classSlice";
import marksheetReducer from "./slices/marksheetSlice";
import formatReducer from "./slices/formatSlice";
import subjectReducer from "./slices/subjectSlice";

const formatPersistConfig = {
  key: "format",
  storage,
};

const rootReducer = combineReducers({
  exam: examReducer,
  class: classReducer,
  marksheet: marksheetReducer,
  format: persistReducer(formatPersistConfig, formatReducer),

  // only this slice persists
  subject: subjectReducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
