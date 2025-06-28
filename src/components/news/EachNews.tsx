import { useNavigate } from "react-router-dom";

import useWindowWidth from "../../hooks/useWindowWidth";

import type { NewsItem } from "../../types/news";

import { parseDate } from "../../utils/parseDate";

import default_thumbnail from "../../assets/images/news/default_thumbnail.png";
import clsx from "clsx";

interface EachNewsProps {
  id: number;
  item: NewsItem;
}

const EachNews: React.FC<EachNewsProps> = ({ id, item }) => {
  const navigate = useNavigate();
  const { md } = useWindowWidth();
  return (
    <button
      className=" flex gap-[6%] px-[2.5%] md:px-[41px] py-[20px] md:gap-[36px] md:py-[24px] w-full  h-[119px] md:h-[210px] border-b-[1px] border-[#E2E2E2] text-start cursor-pointer "
      onClick={() => {
        navigate(`${id}`, { relative: "path" });
      }}
    >
      <div
        className="w-[34.8%] md:w-[238px] h-[79px] md:h-[162px] border-[1px] border-[#E2E2E2] bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: item.thumbnail
            ? `url(${import.meta.env.VITE_API_URL}/uploads/${item.thumbnail})`
            : `url(${default_thumbnail})`,
        }}
      ></div>

      <div className="flex flex-col justify-between w-[60.25%] md:w-[934px] md:gap-[12px]">
        <div className="flex flex-col  md:gap-[7px]">
          <h5
            className={clsx(
              md ? "h5-bold" : "p-xs-bold",
              "text-[#2E3093] line-clamp-1 "
            )}
          >
            {item.category}
          </h5>
          <h4
            className={clsx(
              md ? "h4-bold" : "p-medium-bold",
              "pl-0 line-clamp-2 md:line-clamp-1 break-all"
            )}
          >
            {item.title}
          </h4>
          <div className="hidden md:block md:h-[28px]">
            <p className="w-full p-large-bold text-[#9E9E9E] line-clamp-2  whitespace-pre-wrap break-words ">
              {item.content}
            </p>
          </div>
        </div>
        <span
          className={clsx(
            "text-[#9E9E9E] mt-[3px] md:mt-[12px] ",
            md ? "p-small-bold" : "p-xs-bold"
          )}
        >
          {parseDate(item.createdAt)}
        </span>
      </div>
    </button>
  );
};

export default EachNews;
