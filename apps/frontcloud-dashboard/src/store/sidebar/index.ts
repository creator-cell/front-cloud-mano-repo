import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";


interface OpenedSidebarLink {
    category: string;
    label: string;
}
interface SideBarState {
    isSideBarOpen: boolean;
    openedSidebarLink: OpenedSidebarLink | null
}

const initialState: SideBarState = {
    isSideBarOpen: true,
    openedSidebarLink: null,
};


const SideBarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        openSideBar: (state) => {
            state.isSideBarOpen = true;
        },
        openSubSidebarLink: (state, action: PayloadAction<OpenedSidebarLink>) => {
            state.openedSidebarLink = action.payload;
        },
        closeSubSidebarLink: (state) => {
            state.openedSidebarLink = null;
        },
        closeSideBar: (state) => {
            state.isSideBarOpen = false;
        },
    },

})


export const {
    openSideBar,
    closeSideBar,
    openSubSidebarLink,
    closeSubSidebarLink
} = SideBarSlice.actions;

export default SideBarSlice.reducer;