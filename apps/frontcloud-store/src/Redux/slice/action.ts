// actions.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  isSearchOpen: boolean;
}

const initialState: FormState = {
  isSearchOpen: false
};

const ActionSlice = createSlice({
  name: "searchbar",
  initialState,
  reducers: {
    openSearchBar: (state) => {
      state.isSearchOpen = true;
    },
    closeSearchBar: (state) => {
      state.isSearchOpen = false;
    },
  },
});

export const {
  openSearchBar,
  closeSearchBar
} = ActionSlice.actions;
export default ActionSlice.reducer;
