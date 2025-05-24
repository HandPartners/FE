import type { PropsWithChildren } from "react";
import testBenner from "../assets/images/testBenner.png";

// import bg_top from "../assets/images/background_top.png";

const BGTop: React.FC<PropsWithChildren> = () => {
  return (
    <div className="relative w-screen mt-[40px]">
      <img
        src={testBenner}
        alt="배너"
        className=" h-[500px] bg-cover  bg-top bg-no-repeat "
      />
    </div>
  );
};

export default BGTop;
// <div
//   className="absolute top-[70px] left-0 w-full h-[544px] bg-cover bg-top bg-no-repeat -z-10 border"
//   style={{ backgroundImage: `url(${bg_top})` }}
// >
//   {children}
// </div>
