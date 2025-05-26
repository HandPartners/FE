import clsx from "clsx";
import { useState, useEffect } from "react";
import {
  useInfiniteQuery,
  type InfiniteData,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import BGTop from "../../components/BGTop";
import EachNews from "../../components/news/EachNews";

import api from "../../api/api";

import ic_search from "../../assets/images/ic_search.svg";
import { useNavigate } from "react-router-dom";

export interface NewsItem {
  id: number;
  category: string;
  thumbnail: string;
  title: string;
  content: string;
  createdAt: string;
}
interface NewsResponse {
  success: boolean;
  newsList: NewsItem[];
}

type NewsInfiniteResponse = InfiniteData<NewsResponse>;
import bannerImg from "../../assets/images/banner/NewsBanner.png";
import ScrollToTopButton from "../../components/ScrollToTopButton";
const tabs = [
  "ALL",
  "Consulting",
  "Investment",
  "Education",
  "Networking",
  "Notice",
  "Press",
];

const News: React.FC = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
  });

  const navigate = useNavigate();
  const isAdmin = window.location.pathname.includes("admin");

  useEffect(() => {
    const savedTab = sessionStorage.getItem("newsTab");
    if (savedTab) {
      setActiveTab(savedTab);
      sessionStorage.removeItem("newsTab");
    }
  }, []);

  const fetchNews = async ({
    pageParam = 1,
    queryKey,
  }: QueryFunctionContext<[string, string, string], number>) => {
    const [, activeTab, searchTerm] = queryKey;
    const { data } = await api.get<NewsResponse>("/news", {
      params: {
        pageNum: pageParam,
        ...(activeTab !== "ALL" ? { category: activeTab } : {}),
        ...(searchTerm ? { title: searchTerm } : {}),
      },
    });
    if (!data.success) {
      throw new Error("뉴스 조회에 실패했습니다.");
    }
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      NewsResponse,
      Error,
      NewsInfiniteResponse,
      [string, string, string],
      number
    >({
      queryKey: ["news", activeTab, searchTerm],
      queryFn: fetchNews,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.newsList.length > 0 ? allPages.length + 1 : undefined,
      initialPageParam: 1,
    });

  const newsList = data?.pages.flatMap((p) => p.newsList) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  return (
    <main className="flex flex-col items-center w-full h-full">
      <BGTop testBenner={bannerImg} />
      <section className="flex flex-col gap-[428px] absolute mx-auto w-2/3 h-full">
        <div className="flex flex-col gap-[36px] pt-[100px] pl-[85px] w-full">
          <h1 className="text-[48px] font-bold leading-[60px] tracking-[-0.96px]">
            News
          </h1>
          <h3 className="h3-medium">한줄 소개</h3>
        </div>

        <section className="w-full pb-[200px]">
          <div className="flex gap-[20px] relative w-full mb-[50px]">
            <div className="flex gap-[20px] px-[10px] py-[10px] h-[60px] border border-[#E2E2E2] rounded-[30px]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                  }}
                  className={clsx(
                    "flex items-center justify-center h-full px-[20px] py-[6px] rounded-[30px] h5-bold transition-colors duration-200 cursor-pointer",
                    activeTab === tab && "bg-[#00AEEF] text-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex flex-1 relative h-[60px] border border-[#E2E2E2] rounded-[30px]">
              <input
                className="flex-1 pl-[25px] pr-[5px] focus:outline-none"
                placeholder="검색어를 입력하세요."
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSearch();
                }}
              />
              <button
                onClick={handleSearch}
                className="absolute right-[20px] top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <img src={ic_search} alt="검색" />
              </button>
            </div>

            {isAdmin && (
              <button
                onClick={() => navigate("/admin/news/new")}
                className="absolute right-0 top-[-50px] translate-y-[-100%] w-[197px] h-[60px] h5-bold bg-[#00AEEF] rounded-[30px] cursor-pointer"
              >
                글 작성
              </button>
            )}
          </div>

          <section className="px-[3.203125%]">
            {newsList.map((item) => (
              <EachNews key={item.id} id={item.id} item={item} />
            ))}
          </section>

          <div ref={loadMoreRef} className="h-[1px]" />
        </section>
      </section>

      <ScrollToTopButton />
    </main>
  );
};

export default News;
