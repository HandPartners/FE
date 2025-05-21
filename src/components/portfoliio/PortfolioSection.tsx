import serchIcon from "../../assets/icons/ic_serch.svg";
import { useEffect, useState } from "react";
import { getPortfolio } from "../../api/PortfolioApi";
import type { ResponsePortfolioList } from "../../api/PortfolioApi";

interface PortfolioSection {
  mockData: {
    menu: string;
    name: string;
    contents: string;
    logoUrl: string;
  }[];
}

const PortfolioSection = () => {
  const [category, setCategory] = useState("ICT");
  const [searchInput, setSearchInput] = useState("");
  const [name, setName] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [portfolioList, setPortfolioList] = useState<ResponsePortfolioList>();

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const portfolio = await getPortfolio({
          category,
          name,
          pageNum,
        });
        setPortfolioList(portfolio);
        console.log(portfolio);
      } catch (error) {
        console.error("Error getPortfolio:", error);
      }
    };
    loadSchedules();
  }, [category, name, pageNum]);

  console.log(category);
  return (
    <section className="flex flex-col gap-[50px] w-full pb-[346px]">
      <div className="flex flex-row gap-[20px]">
        <ul className="flex flex-row border border-[var(--grey3)] gap-[20px] rounded-[30px] w-fit p-[10px]">
          <li
            className={`cursor-pointer hover:bg-[var(--sub)] py-[6px] px-[20px] rounded-[30px] ${
              category === "ALL" ? `bg-[var(--sub)]` : ``
            }`}
            onClick={() => {
              console.log("ALL 클릭됨");
              setCategory("ALL");
            }}
          >
            ALL
          </li>
          <li
            className={`cursor-pointer hover:bg-[var(--sub)] py-[6px] px-[20px] rounded-[30px] ${
              category === "ICT" ? `bg-[var(--sub)]` : ``
            }`}
            onClick={() => {
              console.log("ICT 클릭됨");
              setCategory("ICT");
            }}
          >
            ICT
          </li>
          <li
            className={`cursor-pointer hover:bg-[var(--sub)]  py-[6px] px-[20px] rounded-[30px] ${
              category === "Culture" ? `bg-[var(--sub)]` : ``
            }`}
            onClick={() => setCategory("Culture")}
          >
            Culture
          </li>
          <li
            className={`cursor-pointer hover:bg-[var(--sub)] py-[6px] px-[20px] rounded-[30px] ${
              category === "Energy" ? `bg-[var(--sub)]` : ``
            }`}
            onClick={() => setCategory("Energy")}
          >
            Energy
          </li>
          <li
            className={`cursor-pointer hover:bg-[var(--sub)] py-[6px] px-[20px] rounded-[30px] ${
              category === "Others" ? `bg-[var(--sub)]` : ``
            }`}
            onClick={() => setCategory("Others")}
          >
            Others
          </li>
        </ul>
        <div className="relative w-full">
          <input
            className="w-full h-full border border-[var(--grey3)] rounded-[30px] pl-[20px] "
            placeholder="회사명을 입력하세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setName(searchInput);
              }
            }}
          />
          <img
            src={serchIcon}
            alt="검색 버튼"
            className="absolute e right-[20px] top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => {
              setName(searchInput);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 h-[310px] gap-[3.9%]">
        {(portfolioList?.portfolioList || [])
          .filter(
            (item) =>
              (category === "ALL" || item.category === category) &&
              item.name.toLowerCase().includes(name.toLowerCase())
          )
          .map((item, index) => (
            <div
              key={index}
              className="flex flex-col border border-[var(--grey3)]"
            >
              <div className="flex flex-col p-[28px] border-b border-b-[var(--grey3)] gap-[8px] h-[190px]">
                <span className="p-12-bold border border-[var(--main)] w-fit px-[20px] py-[4px] rounded-[30px] text-[var(--main)] justify-center items-center">
                  {item.category}
                </span>
                <span className="p-large-bold">{item.name}</span>
                <p className="p-small-regular">{item.content}</p>
              </div>
              <img src={item.logo} className="p-[20px]"></img>
            </div>
          ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
