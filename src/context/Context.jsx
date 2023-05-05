import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
import React from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,

  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  //This useEffect hook is responsible for saving the user object in the browser's localStorage 
  //whenever the user object in the state changes.
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user)); //then converts the JavaScript object to a JSON string.
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};