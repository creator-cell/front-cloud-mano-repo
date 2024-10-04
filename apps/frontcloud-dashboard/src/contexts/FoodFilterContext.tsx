"use client";

import { createContext, Dispatch, useState, useContext } from "react";

type FoodFilterStateType = {
    category: string;
    priceRange: [number, number];
    brand: string[];
    rating: number | null;
};

const initialFoodFilters: FoodFilterStateType = {
    category: 'Food',
    priceRange: [0, 1000],
    brand: [],
    rating: null,
};

export const FoodFilterContext = createContext<{
    state: FoodFilterStateType;
    setFilters: Dispatch<FoodFilterStateType>;
}>({
    state: initialFoodFilters,
    setFilters: () => { },
});

export const FoodFilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setFilters] = useState(initialFoodFilters);

    return (
        <FoodFilterContext.Provider value={{ state, setFilters }}>
            {children}
        </FoodFilterContext.Provider>
    );
};

export const useFoodFilter = () => useContext(FoodFilterContext);
