"use client";

import { store } from "../components/Redux/store";
import React from "react";
import { Provider } from "react-redux";


const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxProvider