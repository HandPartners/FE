import BGTop from "../components/BGTop";
import testImg from "../../public/testImg.png";
import ProgramSection from "../components/program/ProgramSection";
import { useNavigate } from "react-router-dom";

const Program = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center w-full h-full ">
      <BGTop>
        <section className="flex flex-col gap-[371px] mx-auto w-2/3 h-full translate-y-[70px] ">
          <div className="flex flex-col gap-[36px] pt-[calc(211px-70px)] w-full">
            <h1 className="text-[48px] font-bold leading-[60px] tracking-[-0.96px]">
              Program
            </h1>
            <h3 className="h3-medium">한줄 설명</h3>
          </div>

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
      </BGTop>
    </main>
  );
};

export default Program;
