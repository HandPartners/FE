import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
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
          <div className="flex items-center gap-[20px]">
            <img
              src={logo}
              alt="회사 로고"
              className="cursor-pointer w-[111px] md:w-[197px]"
              onClick={() => navigate(isAdmin ? "/admin" : "/")}
            ></img>
            <img
              src={logo2}
              alt="회사 로고"
              className="w-[92px] h-[44px] md:w-[140px] md:h-[68px] cursor-pointer"
              onClick={() => {
                window.location.href = "https://startuppartners.co.kr";
              }}
            ></img>
          </div>

          {/* 햄버거 버튼 (768px 미만) */}
          <button
            className="block w-[20px] h-[16px] xl:hidden cursor-pointer"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            <img src={hamburgerBtn} alt="≡" />
          </button>

          {/* 네비게이션 버튼 (768px 이상) */}
          <div className="hidden xl:flex gap-[64px]">
            <NavBarBtn isAdmin={isAdmin} path="about">
              About
            </NavBarBtn>
            {/* Program: 홈에서는 스크롤, 타 페이지에서는 홈으로 이동 후 스크롤 */}
            <span
              className="h5-medium cursor-pointer hover:text-[#252676]"
              onClick={() => {
                if (pathname !== (isAdmin ? "/admin" : "/")) {
                  sessionStorage.setItem("scrollToProgram", "true");
                  window.location.href = isAdmin ? "/admin" : "/";
                } else {
                  window.scrollToProgram?.();
                }
              }}
            >
              Program
            </span>
            <NavBarBtn isAdmin={isAdmin} path="program">
              Reference
            </NavBarBtn>
            <NavBarBtn isAdmin={isAdmin} path="portfolio">
              Portfolio
            </NavBarBtn>
            <NavBarBtn isAdmin={isAdmin} path="news">
              News
            </NavBarBtn>
            <span
              className="cursor-pointer inline-block w-[71px] text-center h5-medium transition-colors duration-250 ease-in-out  hover:text-[#252676] "
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
