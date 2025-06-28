import EachTeam from "../../components/about/EachTeam";
import BGTop from "../../components/BGTop";
import TitleLine from "../../components/TitleLine";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import FadeInItem from "../../components/main/FadeInItem";

import useWindowWidth from "../../hooks/useWindowWidth";

import { about } from "../../constants/about";

import bannerImg from "../../assets/images/banner/aboutBanner.png";

const About = () => {
  const { md } = useWindowWidth();

  return (
    <main className=" flex flex-col items-center w-[84.47837150127226%] md:w-[1280px] max-w-full mx-auto relative pb-[200px]">
      <div className="absolute top-[54px] md:top-[119px] left-[15.267175572519083969465648854962%] md:left-[10%] z-100 flex flex-col md:gap-[36px] w-fit text-white">
        <h1
          className={
            md
              ? "text-[48px] font-bold leading-[60px] tracking-[-0.96px]"
              : "h4-bold"
          }
        >
          About
        </h1>
        <h3 className={md ? "h3-medium" : "p-small-medium"}>Hand Partners</h3>
      </div>
      <BGTop testBenner={bannerImg} />

      <section className="flex flex-col gap-[371px] mt-[50px] md:mt-[100px] w-full md:w-[1280px] h-full ">
        <section className="flex flex-col gap-[50px] md:gap-[100px] w-full">
          <FadeInItem>
            <section className="flex flex-col gap-[50px] w-full">
              <TitleLine>WHAT WE DO</TitleLine>

              <article className="flex flex-col gap-[16px]">
                <h3 className={md ? "h3-bold" : "p-large-bold"}>
                  우리는 스타트업의 성장을 돕습니다.
                </h3>
                <h5 className={md ? "h5-medium" : "p-medium-medium"}>
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
          </FadeInItem>

          <FadeInItem>
            <section className="flex flex-col gap-[50px] w-full">
              <TitleLine>TEAM</TitleLine>{" "}
              <article className="grid grid-cols-2 md:grid-cols-5 gap-y-[30px] md:gap-y-[100px] justify-items-center w-full">
                {about.map((member, index) => (
                  <EachTeam
                    key={index}
                    name={member.name}
                    position={member.position}
                    photo={member.photo}
                  />
                ))}
              </article>
            </section>
          </FadeInItem>
        </section>
      </section>
      <ScrollToTopButton />
    </main>
  );
};

export default About;
