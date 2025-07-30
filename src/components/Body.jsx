import React, { useState } from "react";
import Navbar from "./Navbar";

import { Outlet } from "react-router-dom";

function Body() {
  return (
    <>
      <Navbar setSearchTerm />
      <Outlet />
    </>
  );
}

export default Body;
