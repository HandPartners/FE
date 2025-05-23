import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const defaultClassName = "h5-bold cursor-pointer";
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <nav className="flex justify-center items-center relative h-[70px] z-10">
      <div className="flex justify-between items-center w-[calc(100%-640px)]">
        <div>logo</div>
        <div className="flex gap-[64px]">
          <NavLink
            to={isAdmin ? "/admin/about" : "/about"}
            className={({ isActive }) => {
              return clsx(isActive && "text-main", defaultClassName);
            }}
          >
            About
          </NavLink>
          <NavLink
            to={isAdmin ? "/admin/program" : "/program"}
            className={({ isActive }) => {
              return clsx(isActive && "text-main", defaultClassName);
            }}
          >
            Program
          </NavLink>
          <NavLink
            to={isAdmin ? "/admin/portfolio" : "/portfolio"}
            className={({ isActive }) => {
              return clsx(isActive && "text-main", defaultClassName);
            }}
          >
            Portfolio
          </NavLink>
          <NavLink
            to={isAdmin ? "/admin/news" : "/news"}
            className={({ isActive }) => {
              return clsx(isActive && "text-main", defaultClassName);
            }}
          >
            News
          </NavLink>
          <NavLink
            to={isAdmin ? "/admin/contact" : "/contact"}
            className={({ isActive }) => {
              return clsx(isActive && "text-main", defaultClassName);
            }}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
