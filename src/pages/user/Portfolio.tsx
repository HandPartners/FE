import BGTop from "../../components/BGTop";
import PortfolioSection from "../../components/portfolio/PortfolioSection";
import { useCallback, useState, useEffect } from "react";
import { getPortfolio } from "../../api/PortfolioApi";
import type { ResponsePortfolioList } from "../../api/PortfolioApi";
import bannerImg from "../../assets/images/banner/portfolioBanner.png";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import useWindowWidth from "../../hooks/useWindowWidth";

const Portfolio = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [portfolioList, setPortfolioList] = useState<ResponsePortfolioList>();
  const [searchInput, setSearchInput] = useState("");

  const windowWidth = useWindowWidth();
  const isMobile = !windowWidth.md;

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

    <main className=" flex flex-col items-center w-[1280px] max-w-full mx-auto relative pb-[100px]">

      <div className=" absolute top-[54px] left-[60px] md:top-[99px] md:left-[85px] z-10 flex flex-col gap-[3px] md:gap-[36px] w-fit">
        <h1 className={` ${isMobile ? "h4-bold" : "md-banner"}`}>Portfolio</h1>
        <h3 className={` ${isMobile ? "p-small-medium" : "h3-medium"}`}>
          한줄 소개
        </h3>
      </div>
      <BGTop testBenner={bannerImg} />
      <section className="mt-[50px] md:mt-[100px] ">
        <PortfolioSection
          portfolioList={portfolioList}
          category={category}
          setCategory={setCategory}
          setName={setName}
          name={name}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          isAdmin={false}
        />
      </section>
      <ScrollToTopButton />
      <></>
    </main>
  );
};

export default Portfolio;
