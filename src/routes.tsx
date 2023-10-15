import React from "react";
import MainDashboard from "views/application/dashboard";
import NFTMarketplace from "views/application/marketplace";
import {
  LiaCarSolid,
} from "react-icons/lia";
import {
  RxDashboard,
} from "react-icons/rx";

const routes = [
  {
    name: "Dashboard",
    layout: "/application",
    path: "dashboard",
    icon: <RxDashboard className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Cars",
    layout: "/application",
    path: "cars",
    icon: <LiaCarSolid className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
];
export default routes;
