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
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      maxWidth={false}
      scroll="body"
      slotProps={{
        container: {
          sx: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100dvh",
            margin: 0,
            padding: 0,
            display: "block",
            overflow: "hidden",
          },
        },
        paper: {
          sx: {
            backgroundColor: "white",
            width: "100vw",
            height: "100dvh",
            borderRadius: 0,
            boxShadow: "none",
            margin: 0,
            maxWidth: "100vw",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      <div className="h-full overflow-hidden">
        <div className="flex justify-between items-center w-full h-[70px]  pl-[5.59796437659033%] pr-[4.32569974554707%] shadow-[0px_2px_3.5px_0px_var(--Main,_#2E3092)]">
          <img
            src={logo}
            alt="회사 로고"
            onClick={() => navigate(isAdmin ? "/admin" : "/")}
            className="cursor-pointer w-[129.299px] md:w-[197px]"
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
          <SideMenuBtn isAdmin={isAdmin} path="about" onClose={onClose}>
            About
          </SideMenuBtn>
          <SideMenuBtn isAdmin={isAdmin} path="program" onClose={onClose}>
            Program
          </SideMenuBtn>
          <SideMenuBtn isAdmin={isAdmin} path="portfolio" onClose={onClose}>
            Portfolio
          </SideMenuBtn>
          <SideMenuBtn isAdmin={isAdmin} path="news" onClose={onClose}>
            News
          </SideMenuBtn>

          <div className="flex flex-col justify-between pl-[6px] h-[68px] ">
            <span
              className="cursor-pointer flex items-center w-[71px] h-full text-center h5-medium transition-colors duration-250 ease-in-out hover:text-[#b8cce1] "
              onClick={() => {
                onClose();
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
      onClick={onClose}
    >
      <div></div>
      <NavBarBtn isAdmin={isAdmin} path={path}>
        {children}
      </NavBarBtn>
      <hr className="w-full h-[1px] border-[#E2E2E2]" />
    </div>
  );
};
