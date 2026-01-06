import type React from "react";
import { useNavigate } from "react-router-dom";

import TitleLine from "../TitleLine";
import FadeInItem from "./FadeInItem";

import useWindowWidth from "../../hooks/useWindowWidth";

import { parseDate } from "../../utils/parseDate";

import type { NewsItem } from "../../types/news";

import default_thumbnail from "../../assets/images/news/default_thumbnail.png";

interface NewsMainProps {
  title?: string;
  newsList: NewsItem[];
  nav: string;
}

const NewsMain: React.FC<NewsMainProps> = ({ title = "NEWS", newsList, nav }) => {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const isMobile = !windowWidth.md;

  return (
    <section className="flex flex-col  md:w-[1280px] w-[84.7svw] mx-auto gap-[20px] md:gap-[44px]">
      <TitleLine>{title}</TitleLine>
      {newsList.length === 0 ? (
        <p className="text-center text-[var(--grey5)] p-large-bold">게시글이 존재하지 않습니다.</p>
      ) : (
        <div className="">
          {newsList.map((item) => (
            <FadeInItem key={item.id}>
              <div
                className="border-b h-[119px]  py-[20px] px-[10px] md:h-[210px] md:py-[24px] md:px-[41px] border-[var(--grey3)] flex flex-row gap-[20px] md:gap-[36px] cursor-pointer "
                onClick={() => navigate(`${nav}/${item.id}`, { relative: "path" })}
              >
                <img
                  src={
                    item.thumbnail
                      ? `${import.meta.env.VITE_API_URL}/uploads/${item.thumbnail}`
                      : default_thumbnail
                  }
                  alt={item.title}
                  className="w-[34.8%] w-max-[116px] md:w-[238px] h-full  object-cover border border-[var(--grey3)]"
                ></img>

                <section className="flex flex-col gap-[3px] md:gap-[12px] h-full  w-[57%] md:w-[934px] ">
                  <section className="flex flex-col md:gap-[7px] w-full  h-[62px] md:h-[130px]">
                    <span
                      className={`text-[#2E3093]  h-fit flex items-center ${
                        isMobile ? "p-xs-bold" : "h5-bold"
                      }`}
                    >
                      {item.category}
                    </span>
                    <h2
                      className={` w-[100%] h-[48px] md:h-fit  overflow-hidden text-ellipsis line-clamp-2 md:line-clamp-1   ${
                        isMobile ? "p-medium-bold" : "h4-bold"
                      }`}
                    >
                      {item.title}
                    </h2>
                    {isMobile ? (
                      <></>
                    ) : (
                      <p
                        className={` w-full h-fit text-[var(--grey5)] overflow-hidden text-ellipsis line-clamp-2  
                             p-large-bold  whitespace-pre-wrap break-words
                            `}
                      >
                        {item.content}
                      </p>
                    )}
                  </section>
                  <p
                    className={`text-[var(--grey5)]  h-fit truncate ${
                      isMobile ? "p-xs-bold " : "p-small-bold"
                    }`}
                  >
                    {parseDate(item.createdAt)}
                  </p>
                </section>
              </div>
            </FadeInItem>
          ))}
        </div>
      )}
      <span
        className={`flex justify-end cursor-pointer transition-colors duration-250 ease-in-out hover:text-[#2E3092]  ${
          isMobile ? "p-medium-bold" : " p-large-bold"
        }`}
        onClick={() => navigate(`${nav}`, { relative: "path" })}
      >
        소식 전체보기 →
      </span>
    </section>
  );
};

export default NewsMain;
