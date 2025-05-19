import type { PropsWithChildren } from "react";

import bg_top from "../assets/images/background_top.png";

const BGTop: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-[729.825px] bg-cover bg-top bg-no-repeat -z-10"
      style={{ backgroundImage: `url(${bg_top})` }}
    >
      {children}
    </div>
  );
};

export default BGTop;
