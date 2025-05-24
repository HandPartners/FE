import BGTop from "../../components/BGTop";
import testImg from "../../../public/testImg.png";
import ProgramSection from "../../components/program/ProgramSection";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/images/banner/ProgramBanner.png";

const Program = () => {
  const navigate = useNavigate();

  return (
    <main className=" flex flex-col items-center w-[1280px] h-full mx-auto relative">
      <div className="absolute top-[99px] left-[85px] z-10 flex flex-col  gap-[36px] w-fit">
        <h1 className="text-[48px] font-bold leading-[60px] tracking-[-0.96px]">
          Program
        </h1>
        <h3 className="h3-medium">한줄 소개</h3>
      </div>
      <BGTop testBenner={bannerImg} />
      <section className="flex flex-col gap-[371px] mx-auto w-full h-full mt-[100px] ">
        <section className="flex flex-col gap-[200px] w-full pb-[346px] ">
          <ProgramSection
            title={"Phase 1. Consulting"}
            subTitle="창업자들을 대상으로 컨설팅 진행"
            contents="이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다."
            imgUrl={testImg}
            onClick={() => {
              navigate("/news?category=consulting");
            }}
          />
          <ProgramSection
            title={"Phase 2. Investment"}
            subTitle="창업자들을 대상으로 컨설팅 진행"
            contents="이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다."
            imgUrl={testImg}
            onClick={() => {
              navigate("/news?category=investment");
            }}
          />
          <ProgramSection
            title={"Phase 3. Education"}
            subTitle="창업자들을 대상으로 컨설팅 진행"
            contents="이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다."
            imgUrl={testImg}
            onClick={() => {
              navigate("/news?category=education");
            }}
          />
          <ProgramSection
            title={"Phase 4. Networking"}
            subTitle="창업자들을 대상으로 컨설팅 진행"
            contents="이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다.이런수업을 진행합니다."
            imgUrl={testImg}
            onClick={() => {
              navigate("/news?category=networking");
            }}
          />
        </section>
      </section>
    </main>
  );
};

export default Program;
