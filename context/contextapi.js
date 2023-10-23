"use client"
import { createContext, useState } from "react";

export const StateContext = createContext()


export const StateContextProvider = ({ children }) => {

    const [arr, setArr] = useState([])
    return (
        <StateContext.Provider value={{ arr, setArr }}>
            {children}
        </StateContext.Provider>
    )

}