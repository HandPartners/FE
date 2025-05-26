import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const DefaultLayout = () => {
  return (
    <main className="w-screen max-w-[1920px] min-h-screen mx-auto">
      <NavBar />
      <Outlet />
    </main>
  );
};

export default DefaultLayout;
