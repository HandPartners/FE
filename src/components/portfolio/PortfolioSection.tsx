import serchIcon from "../../assets/icons/ic_serch.svg";
import type {
  ResponsePortfolioList,
  AddPortfolioBody,
} from "../../api/PortfolioApi";
import FadeInItem from "../../components/main/FadeInItem";
import useWindowWidth from "../../hooks/useWindowWidth";
import PortfolioSectionItem from "./PortfolioSectionItem";

interface PortfolioSection {
  portfolioList?: ResponsePortfolioList;
  setIsEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setPortfolioId?: React.Dispatch<React.SetStateAction<number>>;
  setFormData?: React.Dispatch<React.SetStateAction<AddPortfolioBody>>;
  category?: string;
  setCategory?: React.Dispatch<React.SetStateAction<string>>;
  setName?: React.Dispatch<React.SetStateAction<string>>;
  name?: string;
  searchInput?: string;
  setSearchInput?: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: boolean;
}

const PortfolioSection: React.FC<PortfolioSection> = ({
  portfolioList,
  setIsEditModalOpen,
  setPortfolioId,
  setFormData,
  category,
  setCategory,
  setName,
  name,
  searchInput,
  setSearchInput,
  isAdmin,
}) => {
  const windowWidth = useWindowWidth();
  const isMobile = !windowWidth.md;

  return (
    <section className="flex flex-col gap-[30px] md:gap-[50px]  w-[92.9svw] md:w-[1280px] pb-[100px] ">
      <div className="flex flex-col md:flex-row gap-[15px] md:gap-[20px]  min-w-[365px] ">
        <ul
          className={` flex border border-[var(--grey3)]  rounded-[30px] w-full md:w-fit py-[8px] h-[48px] md:h-[60px] items-center md:p-[10px] ${
            isMobile ? "p-medium-bold" : "h5-bold"
          }`}
        >
          <div className="flex flex-row md:gap-[20px] justify-center md:justify-start w-full ml-[10px] mr-[10px] md:mr-0 md:mx-auto gap-[2vw] md:w-fit">
            <li
              className={`cursor-pointer hover:bg-[var(--sub)] transition-colors duration-250 ease-in-out hover:text-[#FFF] py-[6px] px-[10px]  md:px-[20px] rounded-[30px] ${
                category === "" ? `bg-[var(--sub)] text-[#FFF]` : ``
              }`}
              onClick={() => {
                if (setCategory) {
                  setCategory("");
                }
              }}
            >
              ALL
            </li>
            <li
              className={`cursor-pointer hover:bg-[var(--sub)]  transition-colors duration-250 ease-in-out hover:text-[#FFF] py-[6px] px-[10px]  md:px-[20px] rounded-[30px] ${
                category === "ICT" ? `bg-[var(--sub)]  text-[#FFF]` : ``
              }`}
              onClick={() => {
                if (setCategory) {
                  setCategory("ICT");
                }
              }}
            >
              ICT
            </li>
            <li
              className={`cursor-pointer hover:bg-[var(--sub)]  transition-colors duration-250 ease-in-out hover:text-[#FFF] py-[6px] px-[10px]  md:px-[20px] rounded-[30px] ${
                category === "Culture" ? `bg-[var(--sub)]  text-[#FFF]` : ``
              }`}
              onClick={() => {
                if (setCategory) {
                  setCategory("Culture");
                }
              }}
            >
              Culture
            </li>
            <li
              className={`cursor-pointer hover:bg-[var(--sub)]  transition-colors duration-250 ease-in-out hover:text-[#FFF] py-[6px] px-[10px]  md:px-[20px] rounded-[30px] ${
                category === "Energy" ? `bg-[var(--sub)]  text-[#FFF]` : ``
              }`}
              onClick={() => {
                if (setCategory) {
                  setCategory("Energy");
                }
              }}
            >
              Energy
            </li>
            <li
              className={`cursor-pointer hover:bg-[var(--sub)]  transition-colors duration-250 ease-in-out hover:text-[#FFF] py-[6px] px-[10px]  md:px-[20px] rounded-[30px] ${
                category === "Others" ? `bg-[var(--sub)]  text-[#FFF]` : ``
              }`}
              onClick={() => {
                if (setCategory) {
                  setCategory("Others");
                }
              }}
            >
              Others
            </li>
          </div>
        </ul>
        <div className="relative w-full">
          <input
            className={`w-full h-[48px] md:h-full border border-[var(--grey3)] rounded-[30px] pl-[20px] pr-[11.45svw] md:pr-[55px] focus:outline-none cursor-pointer ${
              isMobile ? "p-medium-regular" : "h5-regular"
            }`}
            placeholder="회사명을 입력하세요."
            value={searchInput}
            onChange={(e) => {
              setSearchInput?.(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (setName) {
                  setCategory?.("");
                  setName(searchInput ?? "");
                }
              }
            }}
          />
          <img
            src={serchIcon}
            alt="검색 버튼"
            className="absolute e right-[20px] top-1/2 -translate-y-1/2 cursor-pointer "
            onClick={() => {
              if (setName) {
                setCategory?.("");
                setName(searchInput ?? "");
              }
            }}
          />
        </div>
      </div>

      {(portfolioList?.portfolioList?.length ?? 0) === 0 ? (
        <div className="flex flex-col justify-center items-center mt-[50px] w-full text-center">
          <p className={` ${isMobile ? "p-medium-bold" : "h5-medium"}`}>
            {name ? (
              <>
                <span className="h5-bold">"{name}"</span>에 대한 검색 결과가
                없습니다.
              </>
            ) : (
              "게시글이 존재하지 않습니다."
            )}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5  gap-x-[9px] gap-y-[10px] md:gap-[50px]">
          {(portfolioList?.portfolioList || [])
            .filter(
              (item) =>
                (category === "" || item.category === category) &&
                item.name.toLowerCase().includes(item.name.toLowerCase())
            )
            .map((item, index) => (
              <FadeInItem key={index}>
                <PortfolioSectionItem
                  item={item}
                  isAdmin={isAdmin}
                  setPortfolioId={setPortfolioId}
                  setIsEditModalOpen={setIsEditModalOpen}
                  setFormData={setFormData}
                  index={index}
                  isMobile={isMobile}
                />
              </FadeInItem>
            ))}
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
