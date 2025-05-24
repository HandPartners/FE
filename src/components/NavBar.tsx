import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import logo from "../assets/logo.svg";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav
      className="flex justify-center items-center relative h-[70px] w-screen z-10 "
      style={{ boxShadow: "0px 2px 3.5px 0px var(--Main, #2E3092)" }}
    >
      <div className="flex justify-between items-center w-[64%] min-w-[1228px] ">
        <img
          src={logo}
          alt="회사 로고"
          onClick={() => navigate("/")}
          className="cursor-pointer"
        ></img>
        <div className="flex gap-[64px]">
          <NavLink to="/about">
            {({ isActive }) => (
              <span
                className={` cursor-pointer inline-block w-[57px] text-center transition-colors duration-250 ease-in-out hover:text-[#b8cce1]
                  ${clsx(isActive ? "h5-bold text-main" : "h5-medium")}`}
              >
                About
              </span>
            )}
          </NavLink>
          <NavLink to="/program">
            {({ isActive }) => (
              <span
                className={` cursor-pointer inline-block w-[75px] text-center transition-colors duration-250 ease-in-out hover:text-[#b8cce1] ${clsx(
                  isActive ? "h5-bold text-main" : "h5-medium"
                )}`}
              >
                Program
              </span>
            )}
          </NavLink>
          <NavLink to="/portfolio">
            {({ isActive }) => (
              <span
                className={` cursor-pointer inline-block w-[74px] text-center  transition-colors duration-250 ease-in-out hover:text-[#b8cce1] ${clsx(
                  isActive ? "h5-bold text-main" : "h5-medium"
                )}`}
              >
                Portfolio
              </span>
            )}
          </NavLink>
          <NavLink to="/news">
            {({ isActive }) => (
              <span
                className={` cursor-pointer inline-block w-[51px] text-center transition-colors duration-250 ease-in-out hover:text-[#b8cce1] ${clsx(
                  isActive ? "h5-bold text-main" : "h5-medium"
                )}`}
              >
                News
              </span>
            )}
          </NavLink>
          <span
            className="cursor-pointer inline-block w-[71px] text-center h5-medium transition-colors duration-250 ease-in-out hover:text-[#b8cce1] "
            onClick={() => {
              if (window.location.pathname !== "/") {
                sessionStorage.setItem("scrollToContact", "true");
                window.location.href = "/";
              } else {
                window.scrollToContact?.();
              }
            }}
          >
            Contact
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
