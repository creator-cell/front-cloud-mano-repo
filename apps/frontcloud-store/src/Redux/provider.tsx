"use client";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import store from "./app/store";

// import { PersistGate } from "redux-persist/integration/react";

const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
                {children}
            {/* </PersistGate> */}
        </Provider>
    );
};

export default AppProvider;
