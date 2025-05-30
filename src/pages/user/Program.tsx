import BGTop from "../../components/BGTop";
import testImg from "../../../public/testImg.png";
import ProgramSection from "../../components/program/ProgramSection";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/images/banner/ProgramBanner.png";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import useWindowWidth from "../../hooks/useWindowWidth";
const Program = () => {
  const navigate = useNavigate();

  const isAdmin = window.location.pathname.includes("admin");
  const windowWidth = useWindowWidth();
  const isMobile = !windowWidth.md;

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
          <ProgramSection
            title={"Phase 1. Consulting"}
            subTitle="창업자들을 대상으로 컨설팅 진행"
            contents="이런 수업을 진행합니다.이런 수업을 진행합니다.
이런 수업을 진행합니다.이런 수업을 진행합니다.
이런 수업을 진행합니다.이런 수업을 진행합니다.
이런 수업을 진행합니다.이런 수업을 진행합니다.
이런 수업을 진행합니다.이런 수업을 진행합니다."
            imgUrl={testImg}
            onClick={() => {
              sessionStorage.setItem("newsTab", "Consulting");
              navigate(isAdmin ? "/admin/news" : "/news");
            }}
          />
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
        </section>
      </section>
      <ScrollToTopButton />
    </main>
  );
};

export default Program;
