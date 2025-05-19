import EachTeam from "../components/about/EachTeam";
import BGTop from "../components/BGTop";
import TitleLine from "../components/TitleLine";

const About = () => {
  return (
    <main className="w-full h-full flex flex-col items-center ">
      <BGTop>
        <section className="flex flex-col gap-[371px] mx-auto w-2/3 h-full translate-y-[70px]">
          <div className="flex flex-col gap-[36px] pt-[calc(211px-70px)] w-full">
            <h1 className="text-[48px] font-bold leading-[60px] tracking-[-0.96px]">About</h1>
            <h3 className="h3-medium">한줄 소개</h3>
          </div>

          <section className="flex flex-col gap-[100px] w-full">
            <section className="flex flex-col gap-[50px] w-full">
              <TitleLine>WHAT WE DO</TitleLine>
              <article className="flex flex-col gap-[16px]">
                <h3 className="h3-bold">우리는 스타트업의 성장을 돕습니다.</h3>
                <h5 className="h5-medium">
                  우리는 스타트업의 성장을 돕습니다. 이렇게 돕습니다. 우리는 스타트업의 성장을
                  돕습니다. 이렇게 돕습니다. <br />
                  우리는 스타트업의 성장을 돕습니다. 이렇게 돕습니다. 우리는 스타트업의 성장을
                  돕습니다. 이렇게 돕습니다. <br />
                  우리는 스타트업의 성장을 돕습니다. 이렇게 돕습니다. 우리는 스타트업의 성장을
                  돕습니다. 이렇게 돕습니다.
                  <br />
                  우리는 스타트업의 성장을 돕습니다. 이렇게 돕습니다.{" "}
                </h5>
              </article>
            </section>

            <section className="flex flex-col gap-[50px] w-full">
              <TitleLine>TEAM</TitleLine>
              <article className="grid grid-cols-5 gap-y-[100px] justify-items-center w-full">
                {Array.from({ length: 10 }).map((_, index) => (
                  <EachTeam key={index} />
                ))}
              </article>
            </section>
          </section>
        </section>
      </BGTop>
    </main>
  );
};

export default About;
