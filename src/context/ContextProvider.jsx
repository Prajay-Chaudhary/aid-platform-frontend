import React, { createContext, useContext, useReducer } from "react";
import { userReducer, initialState } from "./userReducer";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
