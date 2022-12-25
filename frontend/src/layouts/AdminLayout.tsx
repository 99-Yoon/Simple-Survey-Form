import React from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../admin/SideBar";

export const AdminLayout = () => {
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
    </div>
  );
};
