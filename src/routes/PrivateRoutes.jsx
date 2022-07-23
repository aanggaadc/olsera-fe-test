import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
    const authData = JSON.parse(localStorage.getItem('authData'))

    return authData ? <Outlet /> : <Navigate to={"/login"} />;
}

