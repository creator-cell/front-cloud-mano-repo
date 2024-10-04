"use client";
import { useReducer, createContext, Dispatch } from "react"

type initialStateType = {
    sideBarOpen: boolean
}

const initialState: initialStateType = {
    sideBarOpen: true
}

type Action =
    | { type: 'OPEN', payload: boolean }
    | { type: 'CLOSE', payload: boolean }


export const SideBarOpenCloseContext = createContext<{ state: initialStateType; dispatch: Dispatch<Action> }>({
    state: initialState,
    dispatch: () => { },
});


const sidebBarOpenCloseReducer = (state: initialStateType, action: Action) => {
    switch (action.type) {
        case 'OPEN':
            return { ...state, sideBarOpen: action.payload }
        case 'CLOSE':
            return { ...state, sideBarOpen: action.payload }
        default:
            return state
    }
}


const SideBarOpenCloseContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(sidebBarOpenCloseReducer, initialState)
    return (
        <SideBarOpenCloseContext.Provider value={{ state, dispatch }}>
            {children}
        </SideBarOpenCloseContext.Provider>
    )
}

export default SideBarOpenCloseContextProvider;
