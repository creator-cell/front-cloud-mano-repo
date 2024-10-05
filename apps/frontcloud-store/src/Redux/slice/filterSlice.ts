import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
    category: string;
    filters: { [key: string]: string[] }; // key = filter type (e.g., brand, color), value = array of selected options
}

const initialState: FiltersState = {
    category: "",
    filters: {},
};


const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string>) => {
            if (state.category !== action.payload) {
                state.category = action.payload;
                state.filters = {}; // Reset filters when category changes
            }
        },
        setFilter: (state, action: PayloadAction<{ type: string; value: string }>) => {
            const { type, value } = action.payload;
            const selectedOptions = state.filters[type] || [];

            if (selectedOptions.includes(value)) {
                state.filters[type] = selectedOptions.filter((option) => option !== value);
            } else {
                state.filters[type] = [...selectedOptions, value];
            }
        },
        removeFilter: (state, action: PayloadAction<{ type: string; value: string }>) => {
            const { type, value } = action.payload;
            const selectedOptions = state.filters[type] || [];
            state.filters[type] = selectedOptions.filter((option) => option !== value);
        },
        resetFilters: (state) => {
            state.filters = {}; // Manually reset filters if needed
        },
    }
})

export const { setCategory, setFilter, removeFilter, resetFilters } = filterSlice.actions;
const filterReducer = filterSlice.reducer;

export default filterReducer;
