import type { PropsWithChildren } from "react";

import ic_line_circle from "../assets/images/ic_line_circle.svg";

/**
 * 선과 함께 있는 제목 component
 * @param {string} children 제목
 * @returns
 */
const TitleLine: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex items-center gap-[20px] w-full">
      <h1 className="h1-bold whitespace-nowrap">{children}</h1>
      <div className="flex items-center w-full">
        <img src={ic_line_circle} alt="ic_line_circle" />
        <hr className="w-full h-[2px] bg-[#2E3093]" />
      </div>
    </div>
  );
};

export default TitleLine;
