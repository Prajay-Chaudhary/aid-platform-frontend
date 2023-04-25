import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  //const user = {name:"Oreol", country:"Cameroon"}
  //const moreDetails ={...user, town:"Yaounde"}
  
  return (
    <>
      <Route {...rest} render={(props) => <Element {...props} />} />
    </>
  );
};

export default PrivateRoute;
