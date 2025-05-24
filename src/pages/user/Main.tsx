import BGTop from "../../components/BGTop";
import TitleLine from "../../components/TitleLine";
import { useNavigate } from "react-router-dom";
import ProgramImg from "../../../public/programMain.png";
const Main = () => {
  const navigate = useNavigate();
  return (
    <main className=" flex flex-col items-center w-[1280px] h-full mx-auto relative">
      {/* 배너 */}
      <div className="absolute top-[99px] left-[85px] z-10 flex flex-col  gap-[36px] w-fit">
        <h1 className="text-[48px] font-bold leading-[60px] tracking-[-0.96px]">
          HAND PARTNERS
        </h1>
        <h3 className="h3-medium">Have A Nice Day</h3>
      </div>
      <BGTop />

      {/* 슬로건 */}
      <section
        className="flex flex-col items-center w-screen h-[250px]"
        style={{ boxShadow: "8px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <section>
          <h2>회사 슬로건 슬로건 슬로건</h2>
          <p>회사 슬로건 슬로건 슬로건</p>
        </section>

        <span>About →</span>
      </section>

      <div className="flex flex-col gap-[200px] w-full mt-[50px]">
        {/* 프로그램 */}
        <section className="flex flex-col w-full gap-[50px]">
          <TitleLine>PROGRAM</TitleLine>
          <div className="flex flex-row gap-[20px]">
            <div className="border w-full h-[400px] border-[var(--grey3)]">
              <img
                className="h-[290px] w-full object-cover"
                src={ProgramImg}
              ></img>
              <div className=" h-[110px] flex flex-col text-center px-[49px]">
                <h3 className="p-large-bold">Phase 1. Consulting</h3>
                <p className="p-medium-medium">
                  창업자들을 대상으로 컨설팅 진행 창업자들을 대상으로 컨설팅
                  진행
                </p>
              </div>
            </div>
            <div className="border  w-full h-[400px] border-[var(--grey3)]">
              <img
                className=" h-[290px] w-full object-cover"
                src={ProgramImg}
              ></img>
              <div className=" h-[110px] flex flex-col text-center px-[49px]">
                <h3 className="p-large-bold">Phase 2. Investment</h3>
                <p className="p-medium-medium">
                  창업자들을 대상으로 컨설팅 진행 창업자들을 대상으로 컨설팅
                  진행
                </p>
              </div>
            </div>
            <div className="border w-full  h-[400px] border-[var(--grey3)]">
              <img
                className=" h-[290px] w-full object-cover"
                src={ProgramImg}
              ></img>
              <div className=" h-[110px] flex flex-col text-center px-[49px]">
                <h3 className="p-large-bold">Phase 3. Education</h3>
                <p className="p-medium-medium">
                  창업자들을 대상으로 컨설팅 진행 창업자들을 대상으로 컨설팅
                  진행
                </p>
              </div>
            </div>
            <div className="border w-full h-[400px] border-[var(--grey3)]">
              <img
                className=" h-[290px] w-full object-cover"
                src={ProgramImg}
              ></img>
              <div className=" h-[110px] flex flex-col text-center px-[49px]">
                <h3 className="p-large-bold">Phase 4. Networking</h3>
                <p className="p-medium-medium">
                  창업자들을 대상으로 컨설팅 진행 창업자들을 대상으로 컨설팅
                  진행
                </p>
              </div>
            </div>
          </div>
          <span
            className="flex justify-end cursor-pointer p-large-bold"
            onClick={() => navigate("/program")}
          >
            프로그램 전체보기 →
          </span>
        </section>

        {/* 포트폴리오 */}
        <section className="flex flex-col w-full border gap-[50px]">
          <TitleLine>PORTFOLIO</TitleLine>
          <div className="border h-[408px]"></div>
          <span
            className="flex justify-end cursor-pointer p-large-bold"
            onClick={() => navigate("/portfolio")}
          >
            포트폴리오 전체보기 →
          </span>
        </section>

        {/* 뉴스 */}
        <section className="flex flex-col gap-[44px] border">
          <TitleLine>NEWS</TitleLine>
          <div className="border h-[582px]"></div>
          <span
            className="flex justify-end cursor-pointer p-large-bold"
            onClick={() => navigate("/news")}
          >
            소식 전체보기 →
          </span>
        </section>
        {/* 콘택트 */}
        <section className=" flex flex-col gap-[44px] mb-[99px]">
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
    </main>
  );
};

export default Main;
