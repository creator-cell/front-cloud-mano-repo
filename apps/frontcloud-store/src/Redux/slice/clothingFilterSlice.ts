import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ClothingFilterState {
    priceRange: [number, number];
    brand: string[];
    type: string[];
    rating?: number;
    discount?: number;
    color?: string[];
}

const initialState: ClothingFilterState = {
    priceRange: [0, 10000],
    brand: [],
    type: [],
    rating: undefined,
    discount: undefined,
    color: [],
};

const clothingFilterSlice = createSlice({
    name: 'clothingFilter',
    initialState,
    reducers: {
        setPriceRange(state, action: PayloadAction<[number, number]>) {
            state.priceRange = action.payload;
        },
        setBrand(state, action: PayloadAction<string[]>) {
            state.brand = action.payload;
        },
        setType(state, action: PayloadAction<string[]>) {
            state.type = action.payload;
        },
        setRating(state, action: PayloadAction<number | undefined>) {
            state.rating = action.payload;
        },
        setDiscount(state, action: PayloadAction<number | undefined>) {
            state.discount = action.payload;
        },
        setColor(state, action: PayloadAction<string[] | undefined>) {
            state.color = action.payload;
        },
        resetFilters() {
            return initialState;
        },
    },
});

export const {
    setPriceRange,
    setBrand,
    setType,
    setRating,
    setDiscount,
    setColor,
    resetFilters,
} = clothingFilterSlice.actions;

export default clothingFilterSlice.reducer;
