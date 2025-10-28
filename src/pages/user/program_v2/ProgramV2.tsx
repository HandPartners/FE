import clsx from "clsx";
import { useState, useEffect } from "react";
import {
  useInfiniteQuery,
  type InfiniteData,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

import AdminAddButton from "../../../components/adminAddButton";
import BGTop from "../../../components/BGTop";
import EachNews from "../../../components/news/EachNews";
import ScrollableTabs from "../../../components/news/ScrollableTabs";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import FadeInItem from "../../../components/main/FadeInItem";

import useWindowWidth from "../../../hooks/useWindowWidth";

import api from "../../../api/api";

import type { NewsItem } from "../../../types/news";

import ic_search from "../../../assets/images/ic_search.svg";
import bannerImg from "../../../assets/images/banner/ProgramBanner.png";

interface ProgramV2Response {
  success: boolean;
  programList: NewsItem[];
}

type NewsInfiniteResponse = InfiniteData<ProgramV2Response>;

// Program: Consulting, Investment, Education, Networking
const tabs = ["ALL", "Consulting", "Investment", "Education", "Networking"];

const ProgramV2: React.FC = () => {
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
    const { data } = await api.get<ProgramV2Response>("/program", {
      params: {
        pageNum: pageParam,
        ...(activeTab !== "ALL" ? { category: activeTab } : {}),
        ...(searchTerm ? { title: searchTerm } : {}),
      },
    });
    if (!data?.success) {
      throw new Error("카테고리 조회에 실패했습니다.");
    }
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      ProgramV2Response,
      Error,
      NewsInfiniteResponse,
      [string, string, string],
      number
    >({
      queryKey: ["program", activeTab, searchTerm],
      queryFn: fetchNews,
      getNextPageParam: (lastPage, allPages) =>
        lastPage?.programList?.length > 0 ? allPages.length + 1 : undefined,
      initialPageParam: 1,
    });

  const newsList = data?.pages.flatMap((p) => p.programList) ?? [];

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
    <main className="flex flex-col items-center w-[92.87531806615776%] md:w-[1280px] max-w-full mx-auto relative pb-[100px]">
      <ScrollToTopButton />
      <div className="absolute top-[54px] md:top-[119px] left-[15.267175572519083969465648854962%] md:left-[10%] z-100 flex flex-col md:gap-[36px] w-fit text-white">
        <h1
          className={
            md
              ? "text-[48px] font-bold leading-[60px] tracking-[-0.96px]"
              : "h4-bold"
          }
        >
          References
        </h1>
        <h3 className={md ? "h3-medium" : "p-small-medium"}>Hand Partners</h3>
      </div>

      <BGTop testBenner={bannerImg} />

      <div className="flex justify-end w-full">
        {isAdmin ? (
          <AdminAddButton
            handleClick={() => navigate("/admin/program/new")}
            title={"글 작성"}
          />
        ) : (
          <div className=" h-[50px] md:h-[100px]"></div>
        )}
      </div>

      <section className="w-full md:w-[1280px]">
        <div className="flex flex-col md:flex-row gap-[15px] md:gap-[20px] relative w-[92.6svw] md:w-[1280px] mb-[10px] md:mb-[26px]">
          {md ? (
            <div className="flex gap-[20px] px-[10px] py-[10px]  md:h-[60px] border border-[#E2E2E2] rounded-[30px]">
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
            <ScrollableTabs
              type="program"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
          <div className="flex flex-1 relative md:mx-0 h-[60px] border border-[#E2E2E2] rounded-[30px]">
            <input
              className={`${
                md ? "h5-regular" : "p-medium-regular"
              } flex-1 pl-[25px] pr-[5px] h-[48px] md:h-[60px] focus:outline-none`}
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

        <section className=" px-[4.4%] md:p-0">
          {newsList.length > 0 ? (
            newsList.map((item) => (
              <FadeInItem key={item.id}>
                <EachNews id={item.id} item={item} />
              </FadeInItem>
            ))
          ) : (
            <div className="flex justify-center w-full mt-[50px] md:mt-[100px]">
              <p className={md ? "h5-medium" : "p-medium-medium"}>
                {!searchTerm ? (
                  "게시글이 존재하지 않습니다."
                ) : (
                  <>
                    <span className={md ? "h5-bold" : "p-medium-bold"}>
                      "{searchTerm || ""}"
                    </span>
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

export default ProgramV2;
