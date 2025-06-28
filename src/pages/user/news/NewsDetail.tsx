import clsx from "clsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import DeleteModal from "../../../components/portfolio/modal/DeleteModal";

import useWindowWidth from "../../../hooks/useWindowWidth";

import { parseDate } from "../../../utils/parseDate";
import { parseImgArrayJson } from "../../../utils/parseImgArrayJson";
import { toastAlert } from "../../../utils/toastAlert";

import api from "../../../api/api";

import ic_back from "../../../assets/images/news/ic_back.svg";
import ic_back_sm from "../../../assets/images/news/ic_back_sm.svg";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  content: string;
  thumbnail: string;
  image: string | string[];
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

  const { md } = useWindowWidth();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [data, setData] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      const { data } = await api.get<NewsDetailResponse>(`/news/${id}`);

      data.newsDetail.image = parseImgArrayJson(data.newsDetail.image);
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
      toastAlert("게시글이 삭제되었습니다.", "success");
      navigate("/admin/news");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <main className="w-full h-full flex flex-col items-center py-[30px] md:py-[70px] ">
      <section className="flex flex-col mx-auto w-[333px] md:w-[800px] h-full">
        <div className="flex justify-between w-full">
          <button
            onClick={() => {
              if (isAdmin) {
                navigate("/admin/news");
              } else {
                navigate("/news");
              }
            }}
            className="h5-medium flex items-center gap-[10px] cursor-pointer"
          >
            <img src={md ? ic_back : ic_back_sm} alt="ic_back" />
          </button>
          {isAdmin && (
            <div className="flex gap-[24px]">
              <button
                onClick={() => {
                  if (isAdmin && id) {
                    navigate(`/admin/news/edit/${id}`);
                  }
                }}
                className={clsx(
                  "flex items-center cursor-pointer",
                  md ? "h4-bold" : "p-medium-bold"
                )}
              >
                수정
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(true);
                }}
                className={clsx(
                  "flex items-center cursor-pointer",
                  md ? "h4-bold" : "p-medium-bold"
                )}
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
        <hr className="mt-[10px] md:mt-[20px] mb-[20px] md:mb-[25px] h-[1px] border-[#2E3092]" />

        <div>
          <h4
            className={clsx(
              "h4-bold text-[#2E3093]",
              md ? "h4-bold" : "p-medium-bold"
            )}
          >
            {data?.category}
          </h4>
          <h1
            className={clsx(
              "mt-[10px] mb-[7px] break-all",
              md ? "h1-bold" : "p-large-bold"
            )}
          >
            {data?.title}
          </h1>
          <p
            className={clsx(
              "text-[#9E9E9E]",
              md ? "p-large-bold" : "p-small-bold"
            )}
          >
            {parseDate(data?.createdAt)}
          </p>
        </div>

        <article className="mt-[60px]">
          <p
            className={clsx(
              "text-[#777] whitespace-pre-wrap break-words",
              md ? "p-large-bold" : "p-medium-bold"
            )}
          >
            {data?.content}
          </p>
        </article>
        <div className=" mt-[30px] mb-[50px] md:mt-[80px] md:mb-[40px]">
          {Array.isArray(data?.image) &&
            data?.image.map((img) => (
              <section
                key={img}
                className="flex justify-center w-full not-last:mb-[40px]"
              >
                <img
                  className="w-full md:w-full "
                  src={import.meta.env.VITE_API_URL + "/uploads/" + img}
                  alt=""
                />
              </section>
            ))}
        </div>
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
              className={`${
                md ? "h4-bole" : "p-medium-bold"
              }h4-bold px-[30px] w-fit h-[44px] md:min-w-[196px] md:min-h-[56px] rounded-[30px] bg-[#00AEEF] text-white cursor-pointer`}
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
