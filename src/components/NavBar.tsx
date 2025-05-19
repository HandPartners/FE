import { NavLink } from "react-router-dom";
import clsx from "clsx";

const NavBar = () => {
  const defaultClassName = "h5-bold cursor-pointer";
  return (
    <nav className="flex justify-center items-center h-[70px]">
      <div className="flex justify-between items-center w-[calc(100%-640px)]">
        <div>logo</div>
        <div className="flex gap-[64px]">
          <NavLink
            to="/about"
            className={({ isActive }) => {
              return clsx(isActive && "text-main", defaultClassName);
            }}
          >
            About
          </NavLink>
          <NavLink
            to="/program"
            className={({ isActive }) => {
              return clsx(isActive && "text-main", defaultClassName);
            }}
          >
            Program
          </NavLink>
          <NavLink
            to="/portfolio"
            className={({ isActive }) => {
              return clsx(isActive && "text-main", defaultClassName);
            }}
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) => {
              return clsx(isActive && "text-main", defaultClassName);
            }}
          >
            News
          </NavLink>
          <NavLink
            to="/contact"
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
