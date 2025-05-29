import { useEffect, useState } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";

import MainBanner from "../../components/main/MainBanner";
import TitleLine from "../../components/TitleLine";
import { useNavigate } from "react-router-dom";
import ProgramImg from "../../../public/programMain.png";
import { getMain } from "../../api/MainApi";
import type { portfolioList, newsItem } from "../../api/MainApi";
import { useRef } from "react"; // 추가
import FadeInItem from "../../components/main/FadeInItem";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import default_thumbnail from "../../assets/images/news/default_thumbnail.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/swiper.css";
import { parseDate } from "../../utils/parseDate";

declare global {
  interface Window {
    scrollToContact?: () => void;
  }
}

const programData = [
  {
    img: ProgramImg,
    title: "Phase 1. Consulting",
    contents:
      "창업자들을 대상으로 컨설팅 진행\n창업자들을 대상으로 컨설팅 진행",
  },
  {
    img: ProgramImg,
    title: "Phase 2. Investment",
    contents: "창업자들을 대상으로 컨설팅 진행 창업자들을 대상으로 컨설팅 진행",
  },
  {
    img: ProgramImg,
    title: "Phase 3. Education",
    contents: "창업자들을 대상으로 컨설팅 진행 창업자들을 대상으로 컨설팅 진행",
  },
  {
    img: ProgramImg,
    title: "Phase 4. Networking",
    contents: "창업자들을 대상으로 컨설팅 진행 창업자들을 대상으로 컨설팅 진행",
  },
];

const Main = () => {
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
        const { portfolioList, newsList } = await getMain();
        setPortfolioList(portfolioList);
        setNewsList(newsList);
        console.log(portfolioList);
        console.log(newsList);
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
        <div className="absolute  top-[54px] md:top-[100px] left-[85px] z-100 flex flex-col  md:gap-[3px] w-fit">
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
            Have A Nice Day
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
                  isMobile ? "p-medium-bold" : " slogan-h "
                }`}
              >
                회사 슬로건 슬로건 슬로건
              </h2>
              <p
                className={`text-[var(--grey5)]  ${
                  isMobile ? "p-small-bold" : " slogan-p "
                }`}
              >
                회사 슬로건 슬로건 슬로건
              </p>
            </section>

            <span
              className={`cursor-pointer  transition-colors duration-250 ease-in-out hover:text-[#b8cce1] ${
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
          <section className="flex flex-col md:w-[1280px] w-[84.7svw] mx-auto gap-[20px] md:gap-[50px]">
            <TitleLine>PROGRAM</TitleLine>
            <FadeInItem>
              {isMobile ? (
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  modules={[Pagination]}
                >
                  {programData.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="h-[427px] w-[303px] mx-auto  ">
                        <div className="border border-[var(--grey3)] h-[402px] ">
                          <img
                            className="h-[290px] w-full object-cover"
                            src={item.img}
                          />
                          <div className="h-[110px] text-center px-[47px] py-[17px] bg-[var(--grey1)] ">
                            <h3 className="p-large-bold">{item.title}</h3>
                            <p className="whitespace-pre-wrap p-medium-medium">
                              {item.contents}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="flex flex-row gap-[20px] ">
                  {programData.map((item, idx) => (
                    <>
                      <div
                        key={idx}
                        className=" w-full h-[400px] border-[var(--grey3)]"
                      >
                        <img
                          className="h-[290px] w-full object-cover"
                          src={item.img}
                        ></img>
                        <div className=" h-[110px] flex flex-col text-center px-[48px] py-[17px] border-[var(--grey3)] border bg-[var(--grey1)]">
                          <h3 className="p-large-bold">{item.title}</h3>
                          <p className="p-medium-medium">{item.contents}</p>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              )}
            </FadeInItem>
            <span
              className={`flex justify-end cursor-pointer transition-colors duration-250 ease-in-out hover:text-[#b8cce1]  ${
                isMobile ? "p-medium-bold" : " p-large-bold"
              }`}
              onClick={() => navigate("program", { relative: "path" })}
            >
              프로그램 전체보기 →
            </span>
          </section>

          {/* 포트폴리오 */}
          <section className="flex flex-col md:w-[1280px] w-[84.7svw] mx-auto gap-[20px] md:gap-[50px]">
            <TitleLine>PORTFOLIO</TitleLine>
            <div className="grid grid-cols-2 grid-rows-5 gap-x-[17.4px]  gap-y-[31px]   md:h-[408px] md:grid-cols-5 md:grid-rows-3 md:gap-x-[24px] md:gap-y-[30px] md:px-[40px]">
              {items.slice(0, maxPorfolio).map((item) => {
                return (
                  <FadeInItem key={item.id}>
                    <div className="border border-[var(--grey3)] h-[100%] w-[100%]  max-w-[216px] max-h-[120px] mx-auto flex justify-center">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${
                          item.logo
                        }`}
                        alt={`portfolio-${item.id}`}
                        className="object-contain h-full p-[20px] "
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
            <span
              className={`flex justify-end cursor-pointer transition-colors duration-250 ease-in-out hover:text-[#b8cce1]  ${
                isMobile ? "p-medium-bold" : " p-large-bold"
              }`}
              onClick={() => navigate("portfolio", { relative: "path" })}
            >
              포트폴리오 전체보기 →
            </span>
          </section>

          {/* 뉴스 */}
          <section className="flex flex-col  md:w-[1280px] w-[84.7svw] mx-auto gap-[20px] md:gap-[44px]">
            <TitleLine>NEWS</TitleLine>
            <div>
              {newsList.map((item) => (
                <FadeInItem key={item.id}>
                  <div
                    className="border-b h-[119px]  py-[20px] px-[10px] md:h-[210px] md:py-[24px] md:px-[41px] border-[var(--grey3)] flex flex-row gap-[20px] md:gap-[36px] cursor-pointer "
                    onClick={() =>
                      navigate(`news/${item.id}`, { relative: "path" })
                    }
                  >
                    <img
                      src={
                        item.thumbnail
                          ? `${import.meta.env.VITE_API_URL}/uploads/${
                              item.thumbnail
                            }`
                          : default_thumbnail
                      }
                      className="w-[116px] md:w-[238px] h-full  object-coverm border border-[var(--grey3)]"
                    ></img>
                    <section className="flex flex-col gap-[3px] md:gap-[12px] h-full w-full   ">
                      <section className="flex flex-col md:gap-[7px] w-full  h-[62px] md:h-[130px]">
                        <span
                          className={`text-[#2E3093]  h-fit flex items-center ${
                            isMobile ? "p-xs-bold" : "h5-bold"
                          }`}
                        >
                          {item.category}
                        </span>
                        <h2
                          className={`w-[100%]  h-[48px] md:h-fit  overflow-hidden  text-ellipsis line-clamp-2 md:ine-clamp-1 flex  ${
                            isMobile ? "p-medium-bold" : "h4-bold"
                          }`}
                        >
                          {item.title}
                        </h2>
                        {isMobile ? (
                          <></>
                        ) : (
                          <p
                            className={`w-full h-fit text-[var(--grey5)] overflow-hidden text-ellipsis line-clamp-2  
                             p-large-bold
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

            <span
              className={`flex justify-end cursor-pointer transition-colors duration-250 ease-in-out hover:text-[#b8cce1]  ${
                isMobile ? "p-medium-bold" : " p-large-bold"
              }`}
              onClick={() => navigate("news", { relative: "path" })}
            >
              소식 전체보기 →
            </span>
          </section>
          {/* 콘택트 */}
          <section
            className=" flex flex-col mb-[99px] md:w-[1280px] w-[84.7svw] mx-auto gap-[20px] md:gap-[44px]"
            ref={contactRef}
          >
            <TitleLine>CONTACT</TitleLine>
            <div className="  h-[244px] flex flex-col gap-[60px]">
              <section className=" flex flex-col gap-[4px]">
                <h2 className="h4-bold">SEOUL OFFICE</h2>
                <p className="p-large-bold text-[var(--grey6)]">
                  서울특별시 노원구 광운로 000 00길 00층
                </p>
              </section>
              <section className=" flex-col gap-[4px]">
                <h2 className="h4-bold">SEOUL OFFICE</h2>
                <p className="p-large-bold text-[var(--grey6)]">
                  투자 관련 문의 : 0000@00000
                </p>
                <p className="p-large-bold text-[var(--grey6)]">
                  기업 협업 문의 : 0000@00000{" "}
                </p>
                <p className="p-large-bold text-[var(--grey6)]">
                  기타 문의 : 0000@00000
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
