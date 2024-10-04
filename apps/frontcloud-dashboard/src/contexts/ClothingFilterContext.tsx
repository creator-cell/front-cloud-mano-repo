"use client";

import { createContext, Dispatch, useState, useContext } from "react";

type ClothingFilterStateType = {
    category: string;
    priceRange: [number, number];
    brand: string[];
    type: string[];
    rating: number | null;
    discount: number | null;
    color: string[];
    size: string[];
};

const initialClothingFilters: ClothingFilterStateType = {
    category: 'Clothing',
    priceRange: [0, 10000],
    brand: [],
    type: [],
    discount: null,
    rating: null,
    color: [],
    size: [],
};

export const ClothingFilterContext = createContext<{
    state: ClothingFilterStateType;
    setFilters: Dispatch<ClothingFilterStateType>;
}>({
    state: initialClothingFilters,
    setFilters: () => { },
});

export const ClothingFilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setFilters] = useState(initialClothingFilters);

    return (
        <ClothingFilterContext.Provider value={{ state, setFilters }}>
            {children}
        </ClothingFilterContext.Provider>
    );
};

export const useClothingFilter = () => useContext(ClothingFilterContext);
