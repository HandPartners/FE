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
