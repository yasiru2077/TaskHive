import React from "react";
import NavBar from "./nav-bar";
import { Outlet } from "react-router-dom";

function Layout({setIsAuthenticated}) {
  return <React.Fragment>
    <NavBar setIsAuthenticated={setIsAuthenticated}/>
    <Outlet/>
  </React.Fragment>;
}

export default Layout;
