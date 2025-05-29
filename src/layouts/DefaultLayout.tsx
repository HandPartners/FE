import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";
import ScrollToTop from "../components/ScrollToTop";

const DefaultLayout = () => {
  return (
    <main className="w-screen min-h-screen mx-auto">
      <NavBar />
      <ScrollToTop />
      <Outlet />
    </main>
  );
};

export default DefaultLayout;
