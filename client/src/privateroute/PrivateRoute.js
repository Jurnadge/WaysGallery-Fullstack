import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function PrivateRoute() {
  const tokenUser = localStorage.getItem("token");

  return (
    <div>{tokenUser == null ? <Navigate to="/landing" /> : <Outlet />}</div>
  );
}
