"use client";

import { createContext, Dispatch, useState, useContext } from "react";

type ElectronicsFilterStateType = {
    category: string;
    priceRange: [number, number];
    brand: string[];
    type: string[];
    rating: number | null;
    color: string[];
    size: string[];
};

const initialElectronicsFilters: ElectronicsFilterStateType = {
    category: 'Electronics',
    priceRange: [0, 50000],
    brand: [],
    type: [],
    rating: null,
    color: [],
    size: [],
};

export const ElectronicsFilterContext = createContext<{
    state: ElectronicsFilterStateType;
    setFilters: Dispatch<ElectronicsFilterStateType>;
}>({
    state: initialElectronicsFilters,
    setFilters: () => { },
});

export const ElectronicsFilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setFilters] = useState(initialElectronicsFilters);

    return (
        <ElectronicsFilterContext.Provider value={{ state, setFilters }}>
            {children}
        </ElectronicsFilterContext.Provider>
    );
};

export const useElectronicsFilter = () => useContext(ElectronicsFilterContext);
