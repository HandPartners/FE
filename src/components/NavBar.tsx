import { NavLink } from "react-router-dom";
import clsx from "clsx";

const NavBar = () => {
  const defaultClassName = "h5-regular cursor-pointer";
  return (
    <nav className="flex justify-center items-center h-[70px] border-b border-[0.5px] border-solid border-[#D9D9D9]">
      <div className="flex justify-between items-center w-[calc(100%-640px)]">
        <div>logo</div>
        <div className="flex gap-[64px]">
          <NavLink
            to="/about"
            className={({ isActive }) => {
              return clsx(isActive && "text-[#06AEEF]", defaultClassName);
            }}
          >
            About
          </NavLink>
          <NavLink
            to="/program"
            className={({ isActive }) => {
              return clsx(isActive && "text-[#06AEEF]", defaultClassName);
            }}
          >
            Program
          </NavLink>
          <NavLink
            to="/portfolio"
            className={({ isActive }) => {
              return clsx(isActive && "text-[#06AEEF]", defaultClassName);
            }}
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) => {
              return clsx(isActive && "text-[#06AEEF]", defaultClassName);
            }}
          >
            News
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => {
              return clsx(isActive && "text-[#06AEEF]", defaultClassName);
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
