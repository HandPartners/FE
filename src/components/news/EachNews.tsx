const EachNews = () => {
  return (
    <button className="flex gap-[36px] py-[24px] w-full h-[210px] border-b-[1px] border-[#E2E2E2] text-start cursor-pointer">
      <div className="w-[238px] h-[162px] border-[1px] border-[#E2E2E2]"></div>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-[7px]">
          <h5 className="h5-bold text-[#2E3093] line-clamp-1">Networking</h5>
          <h4 className="h4-bold line-clamp-1">제목제목</h4>
          <p className="p-large-bold text-[#9E9E9E] line-clamp-2">
            콘텐츠 기업인 포도상점은콘텐츠 기업인 포도상점은콘텐츠 기업인
            포도상점은콘텐츠 기업인 포도상점은콘텐츠 기업인 포도상점은콘텐츠
            기업인 포도상점은기업인 포도상점은기업인 포도상점은기업인
            포도상점은기업인 포도상점은기업인 포도상점은기업인 포도상점 콘텐츠
            기업인 포도상점은콘텐츠 기업인 포도상점은콘텐츠 기업인
            포도상점은콘텐츠 기업인 포도상점은콘텐츠 기업인 포도상점은콘텐츠
            기업인 포도상점은기업인 포도상점은기업인 포도상점은기업인
            포도상점은기업인 포도상점은기업인 포도상점은기업인 포도상점
          </p>
        </div>
        <span className="mb-[24px] p-small-bold text-[#9E9E9E]">
          2025.05.21
        </span>
      </div>
    </button>
  );
};

export default EachNews;
