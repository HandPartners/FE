import { useLocation, useNavigate, useParams } from "react-router-dom";

import ic_back from "../../assets/images/ic_back.svg";

const NewsDetail = () => {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <main className="w-full h-full flex flex-col items-center py-[70px] ">
      <section className="flex flex-col mx-auto w-[41.66666666666667%] h-full">
        <div className="flex justify-between w-full">
          <button
            onClick={() => {
              navigate("news", { relative: "path" });
            }}
            className="h5-medium flex items-center gap-[10px] cursor-pointer"
          >
            <img src={ic_back} alt="ic_back" />
          </button>
          {isAdmin && (
            <div className="flex gap-[24px]">
              <button
                onClick={() => {
                  navigate(isAdmin && `/admin/news/edit/${id}`);
                }}
                className="h4-bold flex items-center cursor-pointer"
              >
                수정
              </button>
              <button className="h4-bold flex items-center cursor-pointer">
                삭제
              </button>
            </div>
          )}
        </div>
        <hr className="mt-[20px] mb-[25px] h-[1px] border-[#2E3092]" />

        <div>
          <h4 className="h4-medium text-[#2E3093]">Networking</h4>
          <h1 className="mt-[10px] mb-[7px] h1-bold">제목제목</h1>
          <p className="p-large-bold text-[#9E9E9E]">2025.05.21</p>
        </div>

        <article className="mt-[60px]">
          <p className="p-large-bold text-[#777]">
            콘텐츠 기업인 포도상점은콘텐츠 기업인 포도상점은콘텐츠 기업인
            포도상점은콘텐츠 기업인 포도상점은콘텐츠 기업인 포도상점은콘텐츠
            기업인 포도상점은기업인 포도상점은기업인 포도상점은기업인
            포도상점은기업인 포도상점은기업인 포도상점은기업인 포도상점 콘텐츠
            기업인 포도상점은콘텐츠 기업인 포도상점은콘텐츠 기업인
            포도상점은콘텐츠 기업인 포도상점은콘텐츠 기업인 포도상점은콘텐츠
            기업인 포도상점은기업인 포도상점은기업인 포도상점은기업인
            포도상점은기업인 포도상점은기업인 포도상점은기업인 포도상점
          </p>
        </article>

        <section className="flex justify-center mt-[80px] mb-[40px] w-full">
          <div className="w-[630px] h-[429px] border-[1px] border-[#E2E2E2]"></div>
        </section>

        <section className="flex justify-center w-full">
          <button className="h4-bold w-[196px] h-[56px] rounded-[30px] bg-[#00AEEF] text-white cursor-pointer">
            신청하기
          </button>
        </section>
      </section>
    </main>
  );
};
export default NewsDetail;
