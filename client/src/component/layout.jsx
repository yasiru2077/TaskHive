import React from "react";
import NavBar from "./nav-bar";
import { Outlet } from "react-router-dom";

function Layout() {
  return <React.Fragment>
    <NavBar/>
    <Outlet/>
  </React.Fragment>;
}

export default Layout;
