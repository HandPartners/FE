import { useNavigate } from "react-router-dom";

import type { NewsItem } from "../../pages/News";

import { parseDate } from "../../utils/parseDate";

interface EachNewsProps {
  id: number;
  item: NewsItem;
}

const EachNews: React.FC<EachNewsProps> = ({ id, item }) => {
  const navigate = useNavigate();
  return (
    <button
      className="flex gap-[36px] py-[24px] w-full h-[210px] border-b-[1px] border-[#E2E2E2] text-start cursor-pointer"
      onClick={() => {
        navigate(`${id}`, { relative: "path" });
      }}
    >
      <div
        className="w-[238px] h-[162px] border-[1px] border-[#E2E2E2] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${item.thumbnail})` }}
      ></div>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-[7px]">
          <h5 className="h5-bold text-[#2E3093] line-clamp-1">
            {item.category}
          </h5>
          <h4 className="h4-bold line-clamp-1">{item.title}</h4>
          <p className="p-large-bold text-[#9E9E9E] line-clamp-2">
            {item.content}
          </p>
        </div>
        <span className="mb-[24px] p-small-bold text-[#9E9E9E]">
          {parseDate(item.createdAt)}
        </span>
      </div>
    </button>
  );
};

export default EachNews;
