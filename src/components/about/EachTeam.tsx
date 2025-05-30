import clsx from "clsx";
import useWindowWidth from "../../hooks/useWindowWidth";

const EachTeam = () => {
  const { md } = useWindowWidth();
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[152.489px] md:max-w-[219px] aspect-[219/270] bg-[#D9D9D9]"></div>
      <h4
        className={clsx(
          "mt-[18px] md:mt-[20px] mb-[6px] md:mb-[15px] text-center",
          md ? "h4-bold" : "p-large-bold"
        )}
      >
        이름
      </h4>
      <h5 className={clsx("text-center", md ? "h5-medium" : "p-medium-medium")}>
        직책
      </h5>
    </div>
  );
};

export default EachTeam;
