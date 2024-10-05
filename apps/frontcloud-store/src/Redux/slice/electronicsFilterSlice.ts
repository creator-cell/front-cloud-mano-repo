import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ElectronicsFilterState {
    priceRange: [number, number];
    brand: string[];
    features?: string[];
}

const initialState: ElectronicsFilterState = {
    priceRange: [0, 10000],
    brand: [],
    features: [],
};

const electronicsFilterSlice = createSlice({
    name: 'electronicsFilter',
    initialState,
    reducers: {
        setPriceRange(state, action: PayloadAction<[number, number]>) {
            state.priceRange = action.payload;
        },
        setBrand(state, action: PayloadAction<string[]>) {
            state.brand = action.payload;
        },
        setFeatures(state, action: PayloadAction<string[] | undefined>) {
            state.features = action.payload;
        },
        resetFilters() {
            return initialState;
        },
    },
});

export const {
    setPriceRange,
    setBrand,
    setFeatures,
    resetFilters,
} = electronicsFilterSlice.actions;

export default electronicsFilterSlice.reducer;
