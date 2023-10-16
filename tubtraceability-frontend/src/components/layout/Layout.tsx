import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
// import Menu from "../menu/Menu";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();
 
const Layout: React.FC = () => {
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        {/* <div className="menuContainer">
          <Menu />
        </div> */}
        <div className="contentContainer">
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
