import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import hamburgerBtn from "../../assets/images/hamburgerBtn.svg";
import { useState } from "react";
import NavBarBtn from "./NavBarBtn";
import SideMenuDialog from "./SideMenuDialog";

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      {openDialog && (
        <SideMenuDialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
          }}
        />
      )}
      <nav
        className="flex justify-start px-[5.59796437659033%] 2xl:px-0 2xl:justify-center items-center relative h-[70px] w-screen z-10 "
        style={{ boxShadow: "0px 2px 3.5px 0px var(--Main, #2E3092)" }}
      >
        <div className="flex justify-between items-center w-full 2xl:w-[64%] 2xl:min-w-[1228px] ">
          <img
            src={logo}
            alt="회사 로고"
            onClick={() => navigate(isAdmin ? "/admin" : "/")}
            className="cursor-pointer"
          ></img>

          {/* 햄버거 버튼 (768px 미만) */}
          <button
            className="block md:hidden"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            <img src={hamburgerBtn} alt="≡" />
          </button>

          {/* 네비게이션 버튼 (768px 이상) */}
          <div className="hidden md:flex gap-[64px]">
            <NavBarBtn isAdmin={isAdmin} path="about">
              About
            </NavBarBtn>
            <NavBarBtn isAdmin={isAdmin} path="program">
              Program
            </NavBarBtn>
            <NavBarBtn isAdmin={isAdmin} path="portfolio">
              Portfolio
            </NavBarBtn>
            <NavBarBtn isAdmin={isAdmin} path="news">
              News
            </NavBarBtn>
            <span
              className="cursor-pointer inline-block w-[71px] text-center h5-medium transition-colors duration-250 ease-in-out hover:text-[#b8cce1] "
              onClick={() => {
                if (pathname !== (isAdmin ? "/admin" : "/")) {
                  sessionStorage.setItem("scrollToContact", "true");
                  window.location.href = isAdmin ? "/admin" : "/";
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
    </>
  );
};

export default NavBar;
