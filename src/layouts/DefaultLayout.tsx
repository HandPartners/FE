import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <main className="w-screen max-w-[1920px] h-screen mx-auto">
      <Outlet />
    </main>
  );
};

export default DefaultLayout;
