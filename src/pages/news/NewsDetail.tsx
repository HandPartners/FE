import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../../api/api";

import ic_back from "../../assets/images/ic_back.svg";
import { parseDate } from "../../utils/parseDate";
import DeleteModal from "../../components/portfolio/modal/DeleteModal";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  content: string;
  thumbnail: string;
  image: string[];
  shortcut: string;
  link: string;
  visible: boolean;
  createdAt: string;
}

interface NewsDetailResponse {
  success: boolean;
  newsDetail: NewsItem;
}

const NewsDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [data, setData] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      const { data } = await api.get<NewsDetailResponse>(`/news/${id}`);

      setData(data.newsDetail);
    };
    try {
      fetchNewsDetail();
    } catch (error) {
      alert(error);
    }
  }, [id]);

  const onDeleteNews = async () => {
    try {
      await api.delete(`/news/${id}`);
      navigate("/admin/news");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <main className="w-full h-full flex flex-col items-center py-[70px] ">
      <section className="flex flex-col mx-auto w-[800px] h-full">
        <div className="flex justify-between w-full">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="h5-medium flex items-center gap-[10px] cursor-pointer"
          >
            <img src={ic_back} alt="ic_back" />
          </button>
          {isAdmin && (
            <div className="flex gap-[24px]">
              <button
                onClick={() => {
                  if (isAdmin && id) {
                    navigate(`/admin/news/edit/${id}`);
                  }
                }}
                className="h4-bold flex items-center cursor-pointer"
              >
                수정
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(true);
                }}
                className="h4-bold flex items-center cursor-pointer"
              >
                삭제
              </button>
              {showDeleteModal && (
                <DeleteModal
                  onClose={() => setShowDeleteModal(false)}
                  onDelete={onDeleteNews}
                />
              )}
            </div>
          )}
        </div>
        <hr className="mt-[20px] mb-[25px] h-[1px] border-[#2E3092]" />

        <div>
          <h4 className="h4-medium text-[#2E3093]">{data?.category}</h4>
          <h1 className="mt-[10px] mb-[7px] h1-bold">{data?.title}</h1>
          <p className="p-large-bold text-[#9E9E9E]">
            {parseDate(data?.createdAt)}
          </p>
        </div>

        <article className="mt-[60px]">
          <p className="p-large-bold text-[#777]">{data?.content}</p>
        </article>

        <section className="flex justify-center mt-[80px] mb-[40px] w-full">
          <div
            className="w-[630px] h-[429px] border-[1px] border-[#E2E2E2] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${data?.thumbnail})` }}
          ></div>
        </section>

        <section className="flex justify-center pb-[70px] w-full">
          {data?.visible && (
            <button
              onClick={() => {
                // 외부 링크 이동
                window.open(
                  data?.link?.startsWith("http")
                    ? data.link
                    : `https://${data.link}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="h4-bold w-[196px] h-[56px] rounded-[30px] bg-[#00AEEF] text-white cursor-pointer"
            >
              {data?.shortcut}
            </button>
          )}
        </section>
      </section>
    </main>
  );
};
export default NewsDetail;
