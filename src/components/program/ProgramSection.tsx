import TitleLine from "../../components/TitleLine";
import FadeInItem from "../../components/main/FadeInItem";
import useWindowWidth from "../../hooks/useWindowWidth";

interface ProgramSectionProps {
  title: string;
  subTitle: string;
  contents: string;
  imgUrl: string;
  onClick?: () => void;
}
const ProgramSection: React.FC<ProgramSectionProps> = ({
  title,
  subTitle,
  contents,
  imgUrl,
  onClick,
}) => {
  const windowWidth = useWindowWidth();
  const isMobile = !windowWidth.md;

  return (
    <FadeInItem>
      <section className="flex flex-col gap-[20px] md:gap-[50px] w-full">
        <TitleLine>{title}</TitleLine>
        <article className="flex flex-col md:flex-row gap-[4.6%] md:h-[360px] px-[15px]  md:px-0">
          <img
            src={imgUrl}
            alt="이미지"
            className=" w-full aspect-[3/2] object-cover  md:w-[42%] md:h-full "
          />
          <div className="flex flex-col md:justify-between py-[25px] gap-[30px] md:gap-0">
            <div className="flex flex-col gap-[10px] md:gap-[24px]">
              <h3 className={`${isMobile ? "h5-bold" : "h2-bold"}`}>
                {subTitle}
              </h3>
              <h5 className={`${isMobile ? "p-medium-medium" : "h5-medium "}`}>
                {contents}
              </h5>
            </div>
            <span
              className={`cursor-pointer  text-[var(--sub)] transition-colors duration-250 ease-in-out hover:text-[#8cd2ee] ${
                isMobile ? "p-medium-bold" : "h4-bold "
              }`}
              onClick={onClick}
            >
              진행 사례 보기 →
            </span>
          </div>
        </article>
      </section>
    </FadeInItem>
  );
};

export default ProgramSection;
