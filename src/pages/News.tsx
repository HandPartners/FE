import { useState } from "react";

import BGTop from "../components/BGTop";

import ic_search from "../assets/images/ic_search.svg";
import clsx from "clsx";
import EachNews from "../components/news/EachNews";

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
    <main className="w-full h-full flex flex-col items-center">
      <BGTop>
        <section className="flex flex-col gap-[371px] mx-auto w-2/3 h-full translate-y-[70px]">
          <div className="flex flex-col gap-[36px] pt-[calc(211px-70px)] w-full">
            <h1 className="text-[48px] font-bold leading-[60px] tracking-[-0.96px]">
              News
            </h1>
            <h3 className="h3-medium">한줄 소개</h3>
          </div>

          <section className="w-full">
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
                  className="flex-1 pl-[25px] pr-[5px] z-20"
                  type="text"
                  placeholder="검색어를 입력하세요."
                />
                <button className="absolute right-[25px] top-1/2 -translate-y-1/2">
                  <img src={ic_search} alt="ic_search" />
                </button>
              </div>
            </section>

            <section className="px-[3.203125%] mt-[50px]">
              <EachNews />
            </section>
          </section>
        </section>
      </BGTop>
    </main>
  );
};

export default News;
