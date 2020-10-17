import React, { createContext, useReducer } from "react";
import Reducer from './Reducer'


const initialState = {
    activePage: null,
    bearerToken: null,
    userId: null,
    isAuthenticated: false,
    firstName: "",
    lastName: "",
    roles: [],
    deviceId: null,
    startedGarageRegistration: false,
    devicesToRegister: false,
    garageRole: null,
    addedGarageNode: false,
    garageCoords: null,
    userCoords: null,
    isNight: false,
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;