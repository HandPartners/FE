import BGTop from "../../components/BGTop";
import PortfolioSection from "../../components/portfolio/PortfolioSection";
import { useCallback, useState, useEffect } from "react";
import { getPortfolio } from "../../api/PortfolioApi";
import type { ResponsePortfolioList } from "../../api/PortfolioApi";
import bannerImg from "../../assets/images/banner/portfolioBanner.png";
const Portfolio = () => {
  const [category, setCategory] = useState("ICT");
  const [name, setName] = useState("");
  const [portfolioList, setPortfolioList] = useState<ResponsePortfolioList>();

  const fetchPortfolioList = useCallback(async () => {
    try {
      const portfolio = await getPortfolio({
        category,
        name,
      });
      setPortfolioList(portfolio);
      console.log(portfolio);
    } catch (error) {
      console.error("Error getPortfolio:", error);
    }
  }, [category, name]);

  useEffect(() => {
    fetchPortfolioList();
  }, [fetchPortfolioList]);

  return (
    <main className=" flex flex-col items-center w-[1280px] h-full mx-auto relative">
      <div className="absolute top-[99px] left-[85px] z-10 flex flex-col  gap-[36px] w-fit">
        <h1 className="text-[48px] font-bold leading-[60px] tracking-[-0.96px]">
          Portfolio
        </h1>
        <h3 className="h3-medium">한줄 소개</h3>
      </div>
      <BGTop testBenner={bannerImg} />
      <section className="flex flex-col mt-[100px] gap-[371px] mx-auto w-full h-full  ">
        <PortfolioSection
          portfolioList={portfolioList}
          category={category}
          setCategory={setCategory}
          setName={setName}
          isAdmin={false}
        />
      </section>
    </main>
  );
};

export default Portfolio;
