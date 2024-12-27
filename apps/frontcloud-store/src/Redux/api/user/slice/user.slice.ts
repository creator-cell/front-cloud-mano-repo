import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the UserData interface for strong typing
interface UserData {
    User: {
        UserID: number | null;
        UserName: string;
        Email: string;
        StoreID: number | null;
        RoleID: number | null;
        RoleName: string;
    };
    Token: string;
}

// Initial state with proper typing
const initialState: UserData = {
    User: {
        UserID: null,
        UserName: "",
        Email: "",
        StoreID: null,
        RoleID: null,
        RoleName: "",
    },
    Token: "",
};

// Create the user slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Add user state (similar to setUser)
        addUser: (state, action: PayloadAction<UserData>) => {
            state.User = action.payload.User;
            state.Token = action.payload.Token;
        },
        // Remove user state (clears the state)
        deleteUser: (state) => {
            state.User = {
                UserID: null,
                UserName: "",
                Email: "",
                StoreID: null,
                RoleID: null,
                RoleName: "",
            };
            state.Token = "";
        },
        // For compatibility with the original "setUser"
        setUser: (state, action: PayloadAction<UserData>) => {
            console.log("🚀 ~ action.payload:", action.payload)
            state.User = action.payload.User;
            state.Token = action.payload.Token;
        },
        removeUser: (state) => {
            state.User = {
                UserID: null,
                UserName: "",
                Email: "",
                StoreID: null,
                RoleID: null,
                RoleName: "",
            };
            state.Token = "";
        },
    },
});

export const { addUser, deleteUser, setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
