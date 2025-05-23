import TitleLine from "../../components/TitleLine";
import FadeInItem from "../../components/main/FadeInItem";

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
  return (
    <FadeInItem>
      <section className="flex flex-col gap-[50px] w-full">
        <TitleLine>{title}</TitleLine>
        <article className="flex flex-row gap-[4.6%] h-[360px]">
          <img src={imgUrl} alt="이미지" className="w-[42%] h-full" />
          <div className="flex flex-col justify-between py-[25px] ">
            <div className="flex flex-col gap-[24px]">
              <h3 className="h2-bold">{subTitle}</h3>
              <h5 className="h5-medium ">{contents}</h5>
            </div>
            <span
              className="cursor-pointer h4-bold text-[var(--sub)] transition-colors duration-250 ease-in-out hover:text-[#8cd2ee]"
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
