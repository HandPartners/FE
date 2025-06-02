import React, { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import ic_left from "../../assets/icons/ic_left.svg";
import ic_right from "../../assets/icons/ic_right.svg";

const tabs = [
  "ALL",
  "Notice",
  "Press",
  "Consulting",
  "Investment",
  "Education",
  "Networking",
];

interface ScrollableTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const stepSize = 300;

  const scrollBy = (offset: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });

    // smoothed scroll 끝난 후 재검사
    setTimeout(checkScroll, 300);
  };

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current!;
    // residual 필요
    const epsilon = 1;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - epsilon
    );
  };

  useEffect(() => {
    checkScroll();
  }, [activeTab]);

  useEffect(() => {
    checkScroll();
    scrollRef.current?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div className="md:hidden flex justify-center w-full">
      <div className="relative w-[92.87531806615776%]">
        {canScrollLeft && (
          <button
            onClick={() => scrollBy(-stepSize)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
          >
            <img src={ic_left} alt="left" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          onWheel={() => setTimeout(checkScroll, 0)}
          className="flex gap-[20px] px-[10px] py-[10px] h-[60px] overflow-x-auto scroll-smooth scrollbar-none rounded-[30px] border border-[#E2E2E2]"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "flex items-center justify-center h-full px-[20px] py-[6px] rounded-[30px] h5-bold cursor-pointer hover:bg-[var(--sub)] transition-colors duration-250 ease-in-out hover:text-white",
                activeTab === tab && "bg-[#00AEEF] text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scrollBy(stepSize)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
          >
            <img src={ic_right} alt="right" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ScrollableTabs;
