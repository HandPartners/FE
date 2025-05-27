import serchIcon from "../../assets/icons/ic_serch.svg";
import type {
  ResponsePortfolioList,
  AddPortfolioBody,
} from "../../api/PortfolioApi";
import FadeInItem from "../../components/main/FadeInItem";

interface PortfolioSection {
  portfolioList?: ResponsePortfolioList;
  setIsEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setPortfolioId?: React.Dispatch<React.SetStateAction<number>>;
  setFormData?: React.Dispatch<React.SetStateAction<AddPortfolioBody>>;
  category?: string;
  setCategory?: React.Dispatch<React.SetStateAction<string>>;
  setName?: React.Dispatch<React.SetStateAction<string>>;
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
  searchInput,
  setSearchInput,
  isAdmin,
}) => {
  return (
    <section className="flex flex-col gap-[50px] w-[1280px] pb-[346px]">
      <div className="flex flex-row gap-[20px]">
        <ul className="h5-bold flex flex-row border border-[var(--grey3)] gap-[20px] rounded-[30px] w-fit p-[10px]">
          <li
            className={`cursor-pointer hover:bg-[var(--sub)] transition-colors duration-250 ease-in-out hover:text-[#FFF] py-[6px] px-[20px] rounded-[30px] ${
              category === "" ? `bg-[var(--sub)] text-[#FFF]` : ``
            }`}
            onClick={() => {
              console.log("ALL 클릭됨");
              if (setCategory) {
                setCategory("");
              }
            }}
          >
            ALL
          </li>
          <li
            className={`cursor-pointer hover:bg-[var(--sub)]  transition-colors duration-250 ease-in-out hover:text-[#FFF] py-[6px] px-[20px] rounded-[30px] ${
              category === "ICT" ? `bg-[var(--sub)]  text-[#FFF]` : ``
            }`}
            onClick={() => {
              console.log("ICT 클릭됨");
              if (setCategory) {
                setCategory("ICT");
              }
            }}
          >
            ICT
          </li>
          <li
            className={`cursor-pointer hover:bg-[var(--sub)]  transition-colors duration-250 ease-in-out hover:text-[#FFF]  py-[6px] px-[20px] rounded-[30px] ${
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
            className={`cursor-pointer hover:bg-[var(--sub)]  transition-colors duration-250 ease-in-out hover:text-[#FFF] py-[6px] px-[20px] rounded-[30px] ${
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
            className={`cursor-pointer hover:bg-[var(--sub)]  transition-colors duration-250 ease-in-out hover:text-[#FFF] py-[6px] px-[20px] rounded-[30px] ${
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
        </ul>
        <div className="relative w-full">
          <input
            className="w-full h-full border border-[var(--grey3)] rounded-[30px] pl-[20px] "
            placeholder="회사명을 입력하세요"
            value={searchInput}
            onChange={(e) => {
              setSearchInput?.(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (setName) {
                  setName(searchInput ?? "");
                }
              }
            }}
          />
          <img
            src={serchIcon}
            alt="검색 버튼"
            className="absolute e right-[20px] top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => {
              if (setName && searchInput) {
                setName(searchInput);
              }
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 h-[310px] gap-[50px]">
        {(portfolioList?.portfolioList || [])
          .filter(
            (item) =>
              (category === "" || item.category === category) &&
              item.name.toLowerCase().includes(item.name.toLowerCase())
          )
          .map((item, index) => (
            <FadeInItem key={index}>
              <div
                key={index}
                className={`${
                  !isAdmin ? "" : "cursor-pointer"
                } h-[310px] flex flex-col border border-[var(--grey3)]`}
                onClick={() => {
                  if (setPortfolioId) setPortfolioId(item.id); // 포트폴리오 id 넘김
                  if (setIsEditModalOpen) setIsEditModalOpen(true); // 모달 열기
                  if (setFormData) {
                    setFormData({
                      category: item.category,
                      name: item.name,
                      content: item.content,
                      logo: item.logo,
                    });
                  }
                }}
              >
                <div className="flex flex-col p-[28px] border-b border-b-[var(--grey3)] gap-[8px] h-[190px]">
                  <span className="p-12-bold border border-[var(--main)] w-fit px-[20px] py-[4px] rounded-[30px] text-[var(--main)] justify-center items-center">
                    {item.category}
                  </span>
                  <span className="p-large-bold">{item.name}</span>
                  <p className="p-small-regular">{item.content}</p>
                </div>
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${item.logo}`}
                  className="p-[20px] h-[120px] object-contain"
                ></img>
              </div>
            </FadeInItem>
          ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
