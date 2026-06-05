// store/slices/profileSlice.js

import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profiles",
  initialState: "PT1",

  reducers: {
    setProfileValue: (state, action) => {
      return action.payload;
    },

    clearProfile: () => {
      return null;
    },
  },
});

export const { setProfileValue, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;