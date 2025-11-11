import type { AddPortfolioBody, PortfolioItem } from "../../api/PortfolioApi";
import { twMerge } from "tailwind-merge";

interface PortfolioItemProps {
  item: PortfolioItem;
  isAdmin?: boolean;
  setPortfolioId?: React.Dispatch<React.SetStateAction<number>> | undefined;
  setIsEditModalOpen?:
    | React.Dispatch<React.SetStateAction<boolean>>
    | undefined;
  setFormData?:
    | React.Dispatch<React.SetStateAction<AddPortfolioBody>>
    | undefined;
  index?: number;
  isMobile: boolean;
  isMain?: boolean;
}

const PortfolioSectionItem = ({
  item,
  isAdmin,
  setPortfolioId,
  setIsEditModalOpen,
  setFormData,
  index,
  isMobile,
  isMain = false,
}: PortfolioItemProps) => {
  return (
    <div
      key={index}
      className={twMerge(
        "flex flex-col aspect-[162/260] md:w-[216px] md:h-[310px] border border-[var(--grey3)] bg-white",
        !isAdmin ? "" : "cursor-pointer"
      )}
      onClick={() => {
        if (setPortfolioId) setPortfolioId(item.id);
        if (setIsEditModalOpen) setIsEditModalOpen(true);
        if (setFormData) {
          setFormData({
            category: item.category,
            name: item.name,
            content: item.content,
            logo: item.logo,
          });
        }
      }}
    >
      <div
        className={twMerge(
          "flex flex-col border-b border-b-[var(--grey3)] gap-[4.7%] md:gap-[8px] h-[57.7%] md:h-[190px]",
          !isMain ? "px-[9.25%] py-[9.6%] md:p-[28px]" : "p-[28px]"
        )}
      >
        <span
          className={` border border-[var(--main)] w-fit px-[20px] py-[4px] rounded-[30px] text-[var(--main)] justify-center items-center ${
            isMobile ? "p-xs-bold" : "p-12-bold"
          }`}
        >
          {item.category}
        </span>
        <span
          className={`truncate overflow-hidden whitespace-nowrap ${
            isMobile ? "p-medium-bold" : "p-large-bold"
          }`}
        >
          {item.name}
        </span>
        <p
          className={` w-full text-ellipsis overflow-hidden break-words ${
            isMobile ? "p-xs-regular" : "p-small-regular"
          }`}
        >
          {item.content}
        </p>
      </div>
      {!isMain ? (
        <img
          src={`${import.meta.env.VITE_API_URL}/uploads/${item.logo}`}
          className="h-[42.3%] md:h-[120px] object-contain"
        ></img>
      ) : (
        <div className="flex justify-center items-center flex-1">
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${item.logo}`}
            className="h-[100px] object-contain"
          ></img>
        </div>
      )}
    </div>
  );
};

export default PortfolioSectionItem;
