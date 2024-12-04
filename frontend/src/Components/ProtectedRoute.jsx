import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const {isAuthenticatedState} = useContext(AuthContext);
    return isAuthenticatedState ? <Outlet /> : <Navigate to={"/login"} />;

};

export default ProtectedRoute