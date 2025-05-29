import type { PropsWithChildren } from "react";

import ic_line_circle from "../assets/images/ic_line_circle.svg";
import useWindowWidth from "../hooks/useWindowWidth";

/**
 * 선과 함께 있는 제목 component
 * @param {string} children 제목
 * @returns
 */
const TitleLine: React.FC<PropsWithChildren> = ({ children }) => {
  const windowWidth = useWindowWidth();
  const isMobile = !windowWidth.md;
  return (
    <div className="flex items-center gap-[20px] w-full">
      <h1 className={` whitespace-nowrap ${isMobile ? "h5-bold" : " h1-bold"}`}>
        {children}
      </h1>
      <div className="relative flex items-center w-full overflow-hidden">
        <img
          src={ic_line_circle}
          alt="ic_line_circle"
          className="relative z-10 "
        />
        <hr className="absolute left-1  w-full h-[2px] bg-[#2E3093]" />
      </div>
    </div>
  );
};

export default TitleLine;
