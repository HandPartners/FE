import clsx from "clsx";
import { useState, useEffect } from "react";
import {
  useInfiniteQuery,
  type InfiniteData,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

import BGTop from "../../components/BGTop";
import EachNews from "../../components/news/EachNews";
import AdminAddButton from "../../components/adminAddButton";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import FadeInItem from "../../components/main/FadeInItem";

import api from "../../api/api";

import ic_search from "../../assets/images/ic_search.svg";
import bannerImg from "../../assets/images/banner/NewsBanner.png";
import useWindowWidth from "../../hooks/useWindowWidth";
import ScrollableTabs from "../../components/news/ScrollableTabs";

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

const tabs = [
  "ALL",
  "Notice",
  "Press",
  "Consulting",
  "Investment",
  "Education",
  "Networking",
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

  const { md } = useWindowWidth();

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
    setActiveTab("ALL");
    setSearchTerm(inputValue);
  };

  return (
    <main className="flex flex-col items-center w-[92.87531806615776%] md:w-[1280px] max-w-full mx-auto relative pb-[947px]">
      <div className="absolute top-[60px] md:top-[99px] left-[34px] md:left-[85px] z-10 flex flex-col gap-[3px] md:gap-[36px] w-fit">
        <h1
          className={
            md
              ? "text-[48px] font-bold leading-[60px] tracking-[-0.96px]"
              : "h4-bold"
          }
        >
          News
        </h1>
        <h3 className={md ? "h3-medium" : "p-small-medium"}>한줄 소개</h3>
      </div>

      <BGTop testBenner={bannerImg} />

      <div className="flex justify-end w-full">
        {isAdmin ? (
          <AdminAddButton
            handleClick={() => navigate("/admin/news/new")}
            title={"글 작성"}
          />
        ) : (
          <div className="h-[100px]"></div>
        )}
      </div>

      <section className="pb-[200px] w-full">
        <div className="flex flex-col md:flex-row gap-[20px] md:gap-[15px] relative w-full md:w-[1280px] mb-[50px]">
          {md ? (
            <div className="flex gap-[20px] px-[10px] py-[10px] h-[60px] border border-[#E2E2E2] rounded-[30px]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                  }}
                  className={clsx(
                    "flex items-center justify-center h-full px-[20px] py-[6px] rounded-[30px] h5-bold cursor-pointer hover:bg-[var(--sub)] transition-colors duration-250 ease-in-out hover:text-[#FFF]",
                    activeTab === tab && "bg-[#00AEEF] text-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          ) : (
            <ScrollableTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
          <div className="flex flex-1 relative mx-[14px] md:mx-0 h-[60px] border border-[#E2E2E2] rounded-[30px]">
            <input
              className="flex-1 pl-[25px] pr-[5px] h-[60px] focus:outline-none"
              placeholder="검색어를 입력하세요."
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              onClick={handleSearch}
              className="absolute right-[20px] top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <img src={ic_search} alt="검색" />
            </button>
          </div>
        </div>

        <section className="px-[30px] md:px-[3.203125%]">
          {newsList.length > 0 ? (
            newsList.map((item) => (
              <FadeInItem>
                <EachNews key={item.id} id={item.id} item={item} />
              </FadeInItem>
            ))
          ) : (
            <div className="flex justify-center w-full">
              <p className="h5-medium">
                {!searchTerm ? (
                  "게시글이 존재하지 않습니다."
                ) : (
                  <>
                    <span className="h5-bold">"{searchTerm || ""}"</span>
                    {" 에 대한 검색 결과가 없습니다."}
                  </>
                )}
              </p>
            </div>
          )}
        </section>

        <div ref={loadMoreRef} className="h-[1px]" />
      </section>

      <ScrollToTopButton />
    </main>
  );
};

export default News;
