import React, { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import ic_right from "../../assets/icons/ic_right.svg";

interface ScrollableTabsProps {
  type?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  type = "news",
  activeTab,
  setActiveTab,
}) => {
  let tabs;
  if (type === "news") {
    tabs = ["ALL", "Notice", "Press"];
  } else if (type === "program") {
    tabs = ["ALL", "Consulting", "Investment", "Education", "Networking"];
  } else {
    tabs = ["ALL"];
  }

  const scrollRef = useRef<HTMLDivElement>(null); // 스크롤 가능한 영역을 참조
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({}); // 각 탭 버튼에 대한 참조

  const stepSize = 400; // 버튼 클릭 시 좌우 스크롤 이동 거리

  // 좌우로 스크롤하는 함수
  const scrollBy = (offset: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });

    // 스크롤 후 상태 갱신
    setTimeout(checkScroll, 300); // 애니메이션 완료 후 재확인
  };

  // 좌/우 스크롤 가능 여부 상태
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // 현재 스크롤 위치를 기준으로 좌/우 버튼 표시 여부 판단
  const checkScroll = () => {
    const el = scrollRef.current!;
    const epsilon = 1; // 부동소수점 보정
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - epsilon
    );
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    const tabButton = tabRefs.current[tab];
    const scrollContainer = scrollRef.current;

    if (tabButton && scrollContainer) {
      const offsetLeft = tabButton.offsetLeft;
      const scrollLeft = scrollContainer.scrollLeft;
      const tabWidth = tabButton.offsetWidth;
      const containerWidth = scrollContainer.clientWidth;

      // 1) 왼쪽으로 가려진 경우
      if (offsetLeft < scrollLeft) {
        scrollContainer.scrollTo({
          left: offsetLeft - 28,
          behavior: "smooth",
        });
      }
      // 2) 오른쪽으로 가려진 경우
      else if (offsetLeft + tabWidth > scrollLeft + containerWidth) {
        scrollContainer.scrollTo({
          left: offsetLeft - 28,
          behavior: "smooth",
        });
      }
      // 3) 이미 완전히 보이는 경우는 이동하지 않음
    }
  };

  // activeTab이 바뀔 때마다 스크롤 상태 재확인
  useEffect(() => {
    checkScroll();
  }, [activeTab]);

  // 컴포넌트 마운트 시 scroll, resize 이벤트 등록 및 해제
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
    <div className="flex justify-center w-full md:hidden">
      {/* 모바일 전용 가로 탭 바 컨테이너 */}
      <div className="relative w-[92.6svw]">
        {/* 왼쪽 스크롤 버튼 */}
        {canScrollLeft && (
          <button
            onClick={() => scrollBy(-stepSize)}
            className="absolute left-[1px] top-1/2 -translate-y-1/2 "
          >
            <img className="rotate-180" src={ic_right} alt="left" />
          </button>
        )}

        {/* 스크롤 가능한 탭 목록 */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          onWheel={() => setTimeout(checkScroll, 0)} // 휠로 스크롤할 때도 상태 갱신
          className="flex gap-[1.78svw] px-[10px] py-[10px] h-[48px] overflow-x-auto scroll-smooth scrollbar-hidden rounded-[30px] border border-[#E2E2E2]"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              ref={(el) => {
                tabRefs.current[tab] = el;
              }}
              onClick={() => handleTabClick(tab)}
              className={clsx(
                "p-medium-bold flex items-center justify-center h-full px-[10px] py-[4px] rounded-[30px] h5-bold cursor-pointer hover:bg-[var(--sub)] transition-colors duration-250 ease-in-out hover:text-white",
                activeTab === tab && "bg-[#00AEEF] text-white" // 활성 탭 스타일
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 오른쪽 스크롤 버튼 */}
        {canScrollRight && (
          <button
            onClick={() => scrollBy(stepSize)}
            className="absolute right-[1px] top-1/2 -translate-y-1/2"
          >
            <img src={ic_right} alt="right" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ScrollableTabs;
