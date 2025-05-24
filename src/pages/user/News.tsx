import clsx from "clsx";
import { useState } from "react";

import BGTop from "../../components/BGTop";
import EachNews from "../../components/news/EachNews";

import ic_down_arrow from "../../assets/images/ic_down_arrow.svg";
import ic_search from "../../assets/images/ic_search.svg";

const tabs = [
  "ALL",
  "Consulting",
  "Investment",
  "Education",
  "Networking",
  "Notice",
  "Press",
];

const News = () => {
  const [activeTab, setActiveTab] = useState("ALL");

  return (
    <main className=" flex flex-col items-center w-[1280px] h-full mx-auto relative">
      <div className="absolute top-[99px] left-[85px] z-10 flex flex-col  gap-[36px] w-fit">
        <h1 className="text-[48px] font-bold leading-[60px] tracking-[-0.96px]">
          News
        </h1>
        <h3 className="h3-medium">한줄 소개</h3>
      </div>
      <BGTop />
      <section className="flex flex-col gap-[371px] mx-auto w-full h-full translate-y-[70px]">
        <section className="w-full pb-[200px]">
          <section className="flex gap-[20px] w-full">
            <div className="flex gap-[20px] px-[10px] py-[10px] h-[60px] border border-[#E2E2E2] rounded-[30px]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                  }}
                  className={clsx(
                    "flex items-center justify-center h-full px-[20px] py-[6px] rounded-[30px] h5-bold transition-colors duration-200",
                    activeTab === tab && "bg-[#00AEEF] text-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex flex-1 relative h-[60px] border border-[#E2E2E2] rounded-[30px]">
              <input
                className="flex-1 pl-[25px] pr-[5px] z-20 focus:outline-none"
                type="text"
                placeholder="검색어를 입력하세요."
              />
              <button className="absolute right-[25px] top-1/2 -translate-y-1/2">
                <img src={ic_search} alt="ic_search" />
              </button>
            </div>
          </section>

          <section className="px-[3.203125%] mt-[50px] mb-[70px]">
            <EachNews />
            <EachNews />
          </section>
          <div className="flex items-center justify-center w-full">
            <div className="flex justify-center items-center gap-[10px] w-[300px] h-[50px] rounded-[30px] bg-[#00AEEF] animate-bounce">
              <p className="text-[24px] font-bold leading-[50px] tracking-[-0.48px]">
                LOAD MORE
              </p>
              <img src={ic_down_arrow} alt="ic_down_arrow" />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default News;
