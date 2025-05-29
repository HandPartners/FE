import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";
import React, { type PropsWithChildren } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBarBtn from "./NavBarBtn";
import logo from "../../assets/logo.svg";
import ic_close from "../../assets/images/ic_close.svg";

// 왼쪽에서 슬라이드하는 애니메이션
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

interface SideMenuDialogProps {
  open: boolean;
  onClose: () => void;
}

const SideMenuDialog: React.FC<SideMenuDialogProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <Dialog
      className="side-menu-dialog"
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      slotProps={{
        paper: {
          style: {
            margin: 0,
            position: "absolute",
            left: 0,
            top: 0,
            width: "100vw",
            height: "100%",
            borderRadius: 0,
          },
        },
      }}
    >
      <div>
        <div className="flex justify-between items-center w-full h-[70px]  pl-[22px] pr-[17px] shadow-[0px_2px_3.5px_0px_var(--Main,_#2E3092)]">
          <img
            src={logo}
            alt="회사 로고"
            onClick={() => navigate(isAdmin ? "/admin" : "/")}
            className="cursor-pointer"
          ></img>
          <button>
            {" "}
            <img
              src={ic_close}
              alt="X"
              onClick={onClose}
              className="w-[32px] h-[32px]"
            />
          </button>
        </div>

        <section className="px-[30px] pt-[10px]">
          <SideMenuBtn isAdmin={false} path="about" onClose={onClose}>
            About
          </SideMenuBtn>
          <SideMenuBtn isAdmin={false} path="program" onClose={onClose}>
            Program
          </SideMenuBtn>
          <SideMenuBtn isAdmin={false} path="portfolio" onClose={onClose}>
            Portfolio
          </SideMenuBtn>
          <SideMenuBtn isAdmin={false} path="news" onClose={onClose}>
            News
          </SideMenuBtn>

          <div className="flex flex-col justify-between pl-[6px] h-[68px]">
            <span
              className="cursor-pointer flex items-center w-[71px] h-full text-center h5-medium transition-colors duration-250 ease-in-out hover:text-[#b8cce1] "
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
            <hr className="w-full h-[1px] border-[#E2E2E2]" />
          </div>
        </section>
      </div>
    </Dialog>
  );
};

export default SideMenuDialog;

interface SideMenuBtnProps {
  isAdmin: boolean;
  path: string;
  onClose: () => void;
}

const SideMenuBtn: React.FC<PropsWithChildren<SideMenuBtnProps>> = ({
  isAdmin,
  path,
  onClose,
  children,
}) => {
  return (
    <div
      className="flex flex-col justify-between pl-[6px] h-[68px]"
      onClick={() => {
        onClose();
      }}
    >
      <div></div>
      <NavBarBtn isAdmin={isAdmin} path={path}>
        {children}
      </NavBarBtn>
      <hr className="w-full h-[1px] border-[#E2E2E2]" />
    </div>
  );
};
