import EachTeam from "../../components/about/EachTeam";
import BGTop from "../../components/BGTop";
import TitleLine from "../../components/TitleLine";

const About = () => {
  return (
    <main className=" flex flex-col items-center w-[1280px] h-full mx-auto relative">
      <div className="absolute top-[99px] left-[85px] z-10 flex flex-col  gap-[36px] w-fit">
        <h1 className="text-[48px] font-bold leading-[60px] tracking-[-0.96px]">
          About
        </h1>
        <h3 className="h3-medium">한줄 소개</h3>
      </div>
      <BGTop />

      <section className="flex flex-col gap-[371px]  mt-[100px] mx-auto w-full h-full">
        <section className="flex flex-col gap-[100px] w-full">
          <section className="flex flex-col gap-[50px] w-full">
            <TitleLine>WHAT WE DO</TitleLine>
            <article className="flex flex-col gap-[16px]">
              <h3 className="h3-bold">우리는 스타트업의 성장을 돕습니다.</h3>
              <h5 className="h5-medium">
                우리는 스타트업의 성장을 돕습니다. 이렇게 돕습니다. 우리는
                스타트업의 성장을 돕습니다. 이렇게 돕습니다. <br />
                우리는 스타트업의 성장을 돕습니다. 이렇게 돕습니다. 우리는
                스타트업의 성장을 돕습니다. 이렇게 돕습니다. <br />
                우리는 스타트업의 성장을 돕습니다. 이렇게 돕습니다. 우리는
                스타트업의 성장을 돕습니다. 이렇게 돕습니다.
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
    </main>
  );
};

export default About;