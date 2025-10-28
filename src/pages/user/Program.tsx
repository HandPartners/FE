import BGTop from "../../components/BGTop";
import testImg from "../../../public/testImg.png";
import ProgramSection from "../../components/program/ProgramSection";
import { useNavigate, useSearchParams } from "react-router-dom";
import bannerImg from "../../assets/images/banner/ProgramBanner.png";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useEffect, useRef } from "react";

/** @deprecated 프로그램 페이지 */
const Program = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const programId = searchParams.get("scrollTo");

  const consultingRef = useRef<HTMLDivElement>(null);
  const investmentRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const networkingRef = useRef<HTMLDivElement>(null);

  const isAdmin = window.location.pathname.includes("admin");
  const windowWidth = useWindowWidth();
  const isMobile = !windowWidth.md;

  useEffect(() => {
    if (!programId) return;

    const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL without page reload
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("scrollTo");
        window.history.replaceState({}, "", newUrl);
      }, 100);
    };

    switch (programId) {
      case "consulting":
        scrollToRef(consultingRef);
        break;
      case "investment":
        scrollToRef(investmentRef);
        break;
      case "education":
        scrollToRef(educationRef);
        break;
      case "networking":
        scrollToRef(networkingRef);
        break;
      default:
        break;
    }
  }, [programId]);

  return (
    <main className=" flex flex-col items-center w-[1280px] max-w-full h-full mx-auto relative ">
      <div className="absolute top-[54px] left-[60px] md:top-[99px] md:left-[85px] z-10 flex flex-col gap-[3px] md:gap-[36px] w-fit">
        <h1 className={` ${isMobile ? "h4-bold" : "md-banner"}`}>Program</h1>
        <h3 className={` ${isMobile ? "p-small-medium" : "h3-medium"}`}>
          한줄 소개
        </h3>
      </div>
      <BGTop testBenner={bannerImg} />
      <section className="flex flex-col gap-[371px]  h-full mt-[50px] md:mt-[100px] ">
        <section className="flex flex-col gap-[100px] md:gap-[200px] mx-auto w-[84.7svw] md:w-[1280px] pb-[346px] ">
          <div ref={consultingRef}>
            <ProgramSection
              title={"Phase 1. Consulting"}
              subTitle="창업자들을 대상으로 컨설팅 진행"
              contents="이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다."
              imgUrl={testImg}
              onClick={() => {
                sessionStorage.setItem("newsTab", "Consulting");
                navigate(isAdmin ? "/admin/news" : "/news");
              }}
            />
          </div>
          <div ref={investmentRef}>
            <ProgramSection
              title={"Phase 2. Investment"}
              subTitle="창업자들을 대상으로 컨설팅 진행"
              contents="이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다."
              imgUrl={testImg}
              onClick={() => {
                sessionStorage.setItem("newsTab", "Investment");
                navigate(isAdmin ? "/admin/news" : "/news");
              }}
            />
          </div>
          <div ref={educationRef}>
            <ProgramSection
              title={"Phase 3. Education"}
              subTitle="창업자들을 대상으로 컨설팅 진행"
              contents="이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다."
              imgUrl={testImg}
              onClick={() => {
                sessionStorage.setItem("newsTab", "Education");
                navigate(isAdmin ? "/admin/news" : "/news");
              }}
            />
          </div>
          <div ref={networkingRef}>
            <ProgramSection
              title={"Phase 4. Networking"}
              subTitle="창업자들을 대상으로 컨설팅 진행"
              contents="이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다."
              imgUrl={testImg}
              onClick={() => {
                sessionStorage.setItem("newsTab", "Networking");
                navigate(isAdmin ? "/admin/news" : "/news");
              }}
            />
          </div>
        </section>
      </section>
      <ScrollToTopButton />
    </main>
  );
};

export default Program;
