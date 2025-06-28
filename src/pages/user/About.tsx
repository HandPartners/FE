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

              <section className="flex flex-col gap-[50px]">
                <article className="flex flex-col gap-[16px]">
                  <h3 className={md ? "h3-bold" : "p-large-bold"}>
                    핸드파트너스는 진정성 있는 파트너십으로 <br />
                    스타트업의 스케일업을 함께 만들고 혁신적인 창업 생태계를
                    구축합니다.
                  </h3>
                  <h5 className={md ? "h5-medium" : "p-medium-medium"}>
                    우리는 스타트업의 성장을 돕고, 가속하며, 육성하고,
                    발전시킵니다. <br />
                    핸드파트너스는 진정성을 바탕으로 스타트업과 함께 고민하고
                    성장할 수 있도록 돕고 있으며, <br />
                    우수한 스타트업을 발굴하여 스타트업을 넘어 스케일업 할 수
                    있도록 창업 생태계를 구축하는 일들을 하고 있습니다.
                  </h5>
                </article>
                <article className="flex flex-col gap-[16px]">
                  <h3 className={md ? "h3-bold" : "p-large-bold"}>
                    HAND Partners는 4가지의 원칙으로 스타트업과 함께합니다.
                  </h3>
                  <h5 className={md ? "h5-medium" : "p-medium-medium"}>
                    <strong>H : Helpful (도움이 되는)</strong>
                    <div className="h-[16px]" />
                    스타트업이 겪는 어려움을 해결하고 성장을 촉진시키며,
                    <br />
                    <strong>적극적인 지원</strong>을 통해 단순히 투자를 넘어
                    실질적인 도움을 제공합니다.
                    <div className="h-[16px]" />
                    <strong>A : Accelerating (가속하는)</strong>
                    <div className="h-[16px]" />
                    스타트업의 성장을{" "}
                    <strong>빠르고 효과적으로 이끌어내며,</strong>
                    <br />
                    투자와 지원을 통해 스타트업이 더 빠르게 목표에 도달할 수
                    있도록 함께 달려갑니다.
                    <div className="h-[16px]" />
                    <strong>N : Nurturing (육성하는)</strong>
                    <div className="h-[16px]" />
                    새싹과 같은 스타트업을{" "}
                    <strong>정성껏 보살피고 키워내며,</strong>
                    <br />
                    장기적인 관점에서 스타트업의 잠재력을 발휘하도록 기회를
                    제공합니다.
                    <div className="h-[16px]" />
                    <strong>D : Developing (성장시키는)</strong>
                    <div className="h-[16px]" />
                    스타트업이 <strong>지속적으로 발전하고 확장</strong>할 수
                    있도록 지원하며,
                    <br />
                    단순히 초기 투자를 넘어, 스타트업이 스스로 역량을 키워나갈
                    수 있도록 방향성을 제시합니다.
                  </h5>
                </article>
              </section>
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
