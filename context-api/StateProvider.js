import React, { useReducer, useContext, createContext } from "react";

// MAIN CONTEXT OF THE APP
export const StateContext = createContext();

// APP PROVIDER
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
