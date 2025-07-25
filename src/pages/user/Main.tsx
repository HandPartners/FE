import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// // @ts-expect-error: Swiper CSS에는 타입 선언 파일이 없음
// import "swiper/css";
// // @ts-expect-error: Swiper pagination CSS는 타입 정의가 존재하지 않음
// import "swiper/css/pagination";
// import "../../styles/swiper.css";

import useWindowWidth from "../../hooks/useWindowWidth";

import MainBanner from "../../components/main/MainBanner";
import TitleLine from "../../components/TitleLine";
import FadeInItem from "../../components/main/FadeInItem";
import ScrollToTopButton from "../../components/ScrollToTopButton";

import { getMain } from "../../api/MainApi";

import type { portfolioList, newsItem } from "../../api/MainApi";
import NewsMain from "../../components/main/NewsMain";

declare global {
  interface Window {
    scrollToContact?: () => void;
  }
}

const Main = () => {
  const [programList, setProgramList] = useState<newsItem[]>([]);
  const [portfolioList, setPortfolioList] = useState<portfolioList[]>([]);
  const [newsList, setNewsList] = useState<newsItem[]>([]);

  const items = portfolioList.slice(0, 15);

  const contactRef = useRef<HTMLDivElement | null>(null); // CONTACT 섹션 참조
  const navigate = useNavigate();

  const windowWidth = useWindowWidth();
  const isMobile = !windowWidth.md;
  const maxPorfolio = isMobile ? 10 : 15;
  const emptySlots = maxPorfolio - items.length;

  useEffect(() => {
    const fetchMainData = async () => {
      try {
        const response = await getMain();
        setProgramList(response.programList);
        setPortfolioList(response.portfolioList);
        setNewsList(response.newsList);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMainData();
  }, []);
  // CONTACT로 스크롤 이동하는 함수

  useEffect(() => {
    // 전역 함수로 등록
    window.scrollToContact = () => {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // 최초 진입 시 sessionStorage에 flag 있으면 실행
    if (sessionStorage.getItem("scrollToContact") === "true") {
      sessionStorage.removeItem("scrollToContact");
      setTimeout(() => {
        window.scrollToContact?.();
      }, 300); // 렌더링 후 실행
    }
  }, []);

  return (
    <>
      <main className=" flex flex-col items-center w-[1280px] max-w-full h-full mx-auto relative ">
        {/* 배너 */}
        <div className="absolute top-[54px] md:top-[119px] left-[15.267175572519083969465648854962%] md:left-[10%] z-100 flex flex-col md:gap-[36px] w-fit text-white">
          <h1
            className={` ${
              isMobile
                ? "h4-bold"
                : "text-[48px] font-bold leading-[60px] tracking-[-0.96px]"
            } whitespace-nowrap `}
          >
            HAND PARTNERS
          </h1>
          <h3 className={`${isMobile ? "p-small-medium" : "h3-medium"}`}>
            함께 고민하고, 스케일업을 돕는 진정성 있는 파트너
          </h3>
        </div>
        <MainBanner />

        {/* 슬로건 */}
        <FadeInItem>
          <div
            className={`flex flex-col items-center w-screen py-[15px] gap-[7px] mt-[20px] md:mt-[30px] md:py-[54px]  md:gap-[30px]`}
            style={{ boxShadow: "8px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <section className="flex flex-col items-center">
              <h2
                className={`text-[#2E3093] ${
                  isMobile ? "p-medium-bold text-center" : " slogan-h "
                }`}
              >
                핸드파트너스는 진성성으로 함께 고민하고,{" "}
                {isMobile ? <br /> : ""}스케일업을 위한 길을 만듭니다.
              </h2>
              <p
                className={`text-[var(--grey5)]  ${
                  isMobile ? "p-small-bold" : " slogan-p "
                }`}
              >
                핸드파트너스와 함께 'Have A Nice Day'
              </p>
            </section>

            <span
              className={`cursor-pointer  transition-colors duration-250 ease-in-out hover:text-[#2E3092] ${
                isMobile ? "p-small-bold" : " p-large-bold"
              }`}
              onClick={() => navigate("about", { relative: "path" })}
            >
              About →
            </span>
          </div>
        </FadeInItem>

        <div className="flex flex-col md:gap-[200px] gap-[100px] mt-[50px] ">
          {/* 프로그램 */}
          <NewsMain title="PROGRAM" newsList={programList} />

          {/* 포트폴리오 */}
          <section className="flex flex-col md:w-[1280px] w-[84.7svw] mx-auto gap-[20px] md:gap-[50px]">
            <TitleLine>PORTFOLIO</TitleLine>

            {items.length === 0 ? (
              <p className="text-center text-[var(--grey5)] p-large-bold">
                포트폴리오가 존재하지 않습니다.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-2 grid-rows-5 gap-x-[17.4px] min-w-[312.6px]  gap-y-[31px]  md:h-[408px] md:grid-cols-5 md:grid-rows-3 md:gap-x-[24px] md:gap-y-[30px] md:px-[40px]">
                  {items.slice(0, maxPorfolio).map((item) => {
                    return (
                      <FadeInItem key={item.id}>
                        <div className="border border-[var(--grey3)] h-[100%] min-h-[80px] min-w-[147.6px] w-[100%] max-w-[216px] max-h-[120px] mx-auto flex justify-center">
                          <img
                            src={`${import.meta.env.VITE_API_URL}/uploads/${
                              item.logo
                            }`}
                            alt={`portfolio-${item.id}`}
                            className="object-contain h-full p-[20px]  "
                          />
                        </div>
                      </FadeInItem>
                    );
                  })}
                  {/* 빈 칸 채우기 */}
                  {Array.from({ length: emptySlots }).map((_, index) => (
                    <FadeInItem key={`empty-${index}`}>
                      <div className="border border-[var(--grey3)]   h-[100%] w-[100%] max-h-[120px]  max-w-[216px] mx-auto"></div>
                    </FadeInItem>
                  ))}
                </div>
              </>
            )}

            <span
              className={`flex justify-end cursor-pointer transition-colors duration-250 ease-in-out hover:text-[#2E3092]  ${
                isMobile ? "p-medium-bold" : " p-large-bold"
              }`}
              onClick={() => navigate("portfolio", { relative: "path" })}
            >
              포트폴리오 전체보기 →
            </span>
          </section>

          {/* NEWS */}
          <NewsMain newsList={newsList} />

          {/* 콘택트 */}
          <section
            className=" flex flex-col mb-[99px] md:w-[1280px] w-[84.7svw] mx-auto gap-[20px] md:gap-[44px]"
            ref={contactRef}
          >
            <TitleLine>CONTACT</TitleLine>
            <div className="  h-[244px] flex flex-col gap-[60px] md:ml-[41px]">
              <section className=" flex flex-col gap-[4px] ">
                <h2 className={`${isMobile ? "p-large-bold " : "h4-bold"}`}>
                  SEOUL OFFICE
                </h2>
                <p
                  className={` text-[var(--grey6)] ${
                    isMobile ? "p-small-bold " : "p-large-bold "
                  }`}
                >
                  [서울] 서울 구로구 디지털로26길 43, L동 1205호
                </p>
                <p
                  className={` text-[var(--grey6)] ${
                    isMobile ? "p-small-bold " : "p-large-bold "
                  }`}
                >
                  [충남] 천안시 동남구 은행길9, 430호
                </p>
              </section>
              <section className=" flex-col gap-[4px]">
                <h2 className={`${isMobile ? "p-large-bold " : "h4-bold"}`}>
                  MAIL
                </h2>
                <p
                  className={` text-[var(--grey6)] ${
                    isMobile ? "p-small-bold " : "p-large-bold "
                  }`}
                >
                  admin@handpartners.co.kr
                </p>
              </section>
              <section className=" flex-col gap-[4px]">
                <h2 className={`${isMobile ? "p-large-bold " : "h4-bold"}`}>
                  TEL
                </h2>
                <p
                  className={` text-[var(--grey6)] mb-[100px] ${
                    isMobile ? "p-small-bold " : "p-large-bold "
                  }`}
                >
                  02-941-4339
                </p>
              </section>
            </div>
          </section>
        </div>
        <ScrollToTopButton />
      </main>
    </>
  );
};

export default Main;
