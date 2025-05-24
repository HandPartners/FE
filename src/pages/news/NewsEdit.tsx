import { useState } from "react";

import NewsEditDropdownBtn from "../../components/news/NewsEditDropdownBtn";
import NewsEditFileInput from "../../components/news/NewsEditFileInput";
import NewsEditLinkBtnInput from "../../components/news/NewsEditLinkBtnInput";

import ic_check_mono from "../../assets/images/news/ic_check_mono.svg";
import ic_up from "../../assets/images/news/ic_up.svg";

const NewsEdit = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categories = [
    "Consulting",
    "Investment",
    "Education",
    "Networking",
    "Notice",
    "Press",
  ];
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <main className="w-full h-full flex flex-col items-center py-[70px] ">
      <section className="flex flex-col mx-auto w-[41.66666666666667%] h-full">
        <button
          onClick={() => {
            setIsCategoryOpen((prev) => !prev);
          }}
          className="flex items-center gap-[20px] cursor-pointer"
        >
          <h4 className="h4-bold text-[#2E3093]">카테고리 선택</h4>
          <img
            className={!isCategoryOpen ? "rotate-180" : ""}
            src={ic_up}
            alt="ic_up"
          />
        </button>
        {isCategoryOpen && (
          <div className="flex flex-col py-[11px] w-fit bg-white border-[1px] border-[#E2E2E2] rounded-[5px] ">
            {categories.map((category, index) => (
              <NewsEditDropdownBtn
                key={category}
                selected={selectedCategory === index}
                onClick={() => {
                  setSelectedCategory(index);
                }}
              >
                {category}
              </NewsEditDropdownBtn>
            ))}
          </div>
        )}

        <input
          className="p-[20px] h-[84px] bg-[#F4F7F8] text-[#777] h1-bold rounded-[5.957px] "
          type="text"
          placeholder="제목을 작성하세요."
        />
        <p className="mt-[7px] mb-[45px] p-large-bold text-[#777]">
          2025.05.21
        </p>

        <textarea
          className="p-[20px] h-[750px] bg-[#F4F7F8] text-[#777] p-large-bold rounded-[5.957px] "
          placeholder="내용을 작성하세요."
        />

        <hr className="mt-[70px] mb-[24px] border-1 border-solid border-[#D9D9D9] " />

        <h4 className="mb-[24px] h4-bold">이미지</h4>

        <div className="flex flex-col gap-[24px]">
          <NewsEditFileInput>표지 이미지</NewsEditFileInput>
          <NewsEditFileInput multiple>본문 이미지</NewsEditFileInput>
        </div>

        <hr className="my-[24px] border-1 border-solid border-[#D9D9D9] " />

        <section className="flex flex-col gap-[24px]">
          <NewsEditLinkBtnInput placeholder="'신청하기' 등 버튼 이름을 입력해주세요.">
            버튼 이름
          </NewsEditLinkBtnInput>
          <NewsEditLinkBtnInput placeholder="링크를 삽입해주세요.">
            버튼 링크
          </NewsEditLinkBtnInput>
        </section>

        <button className="flex items-center gap-[10px] mt-[18px] mb-[100px] p-small-medium cursor-pointer">
          <img src={ic_check_mono} alt="" />
          버튼을 화면에 보여주기
        </button>

        <div className="flex justify-end gap-[28px] pb-[70px]">
          <button className="w-[164px] h-[48px] p-medium-bold text-white rounded-[5px] bg-[#BABABA] cursor-pointer">
            취소
          </button>
          <button className="w-[164px] h-[48px] p-medium-bold text-white rounded-[5px] bg-[#00AEEF] cursor-pointer">
            등록
          </button>
        </div>
      </section>
    </main>
  );
};

export default NewsEdit;
