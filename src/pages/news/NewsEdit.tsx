import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import NewsEditDropdownBtn from "../../components/news/NewsEditDropdownBtn";
import NewsEditFileInput from "../../components/news/NewsEditFileInput";
import NewsEditLinkBtnInput from "../../components/news/NewsEditLinkBtnInput";

import useOutsideClick from "../../hooks/useOutsideClick";
import useWindowWidth from "../../hooks/useWindowWidth";

import { parseImgArrayJson } from "../../utils/parseImgArrayJson";
import { getCurrentDate } from "../../utils/getCurrentDate";
import { toastAlert } from "../../utils/toastAlert";

import api from "../../api/api";

import ic_check_colored from "../../assets/images/news/ic_check_colored.svg";
import ic_check_mono from "../../assets/images/news/ic_check_mono.svg";
import ic_up from "../../assets/images/news/ic_up.svg";

type FormValues = {
  category: string;
  title: string;
  content: string;
  thumbnail?: File[] | string;
  image?: File[];
  shortcut?: string;
  link?: string;
  visible: boolean;
  keepImages: string[];
};

const NewsEdit = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const { isOutside } = useOutsideClick({ ref });

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    number | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const navigate = useNavigate();

  const isAdmin = window.location.pathname.startsWith("/admin");
  const isEditing = window.location.pathname.includes("edit");

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [data, setData] = useState<FormValues | null>(null);

  const categories = [
    "Consulting",
    "Investment",
    "Education",
    "Networking",
    "Notice",
    "Press",
  ];

  const { id } = useParams();
  const { md } = useWindowWidth();

  useEffect(() => {
    if (isEditing && id) {
      (async () => {
        try {
          const { data } = await api.get(`/news/update/${id}`);

          data.news.image = parseImgArrayJson(data.news.image);
          const newsData = data.news;

          setValue("category", newsData.category);
          const index = categories.indexOf(newsData.category);
          if (index >= 0) {
            setSelectedCategoryIndex(index);
            setSelectedCategory(categories[index]);
          }

          setValue("title", newsData.title);
          setValue("content", newsData.content);
          setValue("shortcut", newsData.shortcut);
          setValue("link", newsData.link);
          setValue("visible", newsData.visible);
          if (newsData.thumbnail) {
            setValue("thumbnail", newsData.thumbnail);
          }
          setData(newsData);
          setExistingImages(newsData.image);
        } catch (error) {
          console.error("뉴스 불러오기 실패", error);
        }
      })();
    }
  }, [id, isEditing]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      visible: false,
    },
  });

  // 카테고리 변경 시 form 값에도 반영
  useEffect(() => {
    if (selectedCategoryIndex !== null) {
      const cat = categories[selectedCategoryIndex];
      setSelectedCategory(cat);
      setValue("category", cat);
    }
  }, [selectedCategoryIndex, setValue]);

  useEffect(() => {
    if (isOutside) {
      setIsCategoryOpen(false);
    }
  }, [isOutside]);

  useEffect(() => {
    setValue("keepImages", existingImages);
  }, [existingImages, setValue]);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("title", data.title);
    formData.append("content", data.content);
    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail[0]);
    }
    if (data.image) {
      Array.from(data.image).forEach((file) => formData.append("image", file));
    }
    if (data.shortcut) {
      formData.append("shortcut", data.shortcut);
    }
    if (data.link) {
      formData.append("link", data.link);
    }
    formData.append("visible", String(data.visible));
    if (data.keepImages) {
      formData.append("keepImages", JSON.stringify(data.keepImages));
    }

    try {
      if (isEditing && id) {
        await api.patch(`/news/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toastAlert("게시글이 수정되었습니다.", "success");
      } else {
        await api.post("/news/new", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toastAlert("게시글이 추가되었습니다.", "success");
      }

      if (isAdmin) {
        navigate("/admin/news");
      } else {
        navigate("/news");
      }
    } catch (error) {
      alert(error);
    }
  };

  const visible = watch("visible");
  const isCategoryValid = watch("category") || false;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-[200%] flex flex-col items-center py-[70px] "
    >
      <section className="flex flex-col relative mx-auto w-[333px] md:w-[800px] h-full">
        <button
          type="button"
          onClick={() => {
            setIsCategoryOpen((prev) => !prev);
          }}
          ref={ref}
          className="flex items-center gap-[10px] md:gap-[20px] cursor-pointer w-fit"
        >
          <h4
            className={clsx(md ? "h4-bold" : "p-medium-bold", "text-[#2E3093]")}
          >
            {selectedCategory || "카테고리 선택"}
          </h4>
          <img
            className={clsx(
              !isCategoryOpen ? "rotate-180" : "",
              "w-[14.545px] md:w-[24px]"
            )}
            src={ic_up}
            alt="ic_up"
          />
          {isCategoryOpen && (
            <div className="absolute flex flex-col py-[11px] w-fit bg-white border-[1px] border-[#E2E2E2] rounded-[5px] z-10 top-[40px]">
              {categories.map((category, index) => (
                <NewsEditDropdownBtn
                  key={category}
                  selected={selectedCategoryIndex === index}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedCategoryIndex(index);
                    setIsCategoryOpen(false);
                  }}
                >
                  {category}
                </NewsEditDropdownBtn>
              ))}
            </div>
          )}
        </button>
        {errors.category && (
          <p className="text-red-500">카테고리를 선택해주세요.</p>
        )}

        <input
          {...register("title", { required: true })}
          className={clsx(
            "mt-[10px] p-[20px] h-[44px] md:h-[84px] bg-[#F4F7F8] text-[#777] rounded-[5.957px]",
            md ? "h1-bold" : "p-large-bold"
          )}
          type="text"
          placeholder="제목을 작성하세요."
        />
        {errors.title && <p className="text-red-500">제목을 입력해주세요.</p>}

        <p
          className={clsx(
            "mt-[7px] mb-[20px] md:mb-[45px] text-[#777]",
            md ? "p-large-bold" : "p-small-bold"
          )}
        >
          {getCurrentDate()}
        </p>

        <textarea
          {...register("content", { required: true })}
          className={clsx(
            "p-[20px] h-[750px] bg-[#F4F7F8] text-[#777] rounded-[5.957px] box-border",
            md ? "p-large-bold" : "p-medium-bold"
          )}
          placeholder="내용을 작성하세요."
        />
        {errors.content && <p className="text-red-500">내용을 입력해주세요.</p>}

        <hr className="mt-[70px] mb-[24px] border-1 border-solid border-[#D9D9D9]" />

        <h4 className={clsx("mb-[24px]", md ? "h4-bold" : "h5-bold")}>
          이미지
        </h4>

        <div className="flex flex-col gap-[24px]">
          <Controller
            name="thumbnail"
            control={control}
            render={({ field }) => (
              <NewsEditFileInput
                {...field}
                onChange={(files: File[]) => {
                  setValue("thumbnail", files);
                }}
                existFileName={data?.thumbnail}
              >
                표지 이미지
              </NewsEditFileInput>
            )}
          />

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <NewsEditFileInput
                multiple
                {...field}
                onChange={(files: File[]) => {
                  setValue("image", files);
                }}
                existFileName={existingImages}
                onRemoveExisting={(index) =>
                  setExistingImages((imgs) =>
                    imgs.filter((_, i) => i !== index)
                  )
                }
              >
                본문 이미지
              </NewsEditFileInput>
            )}
          />
        </div>

        <hr className="my-[24px] border-1 border-solid border-[#D9D9D9]" />

        <h4 className={clsx("mb-[24px]", md ? "h4-bold" : "h5-bold")}>
          바로가기 버튼
        </h4>
        <section className="flex flex-col gap-[24px]">
          <Controller
            name="shortcut"
            control={control}
            render={({ field }) => (
              <NewsEditLinkBtnInput
                {...field}
                placeholder="'신청하기' 등 버튼 이름을 입력해주세요."
              >
                버튼 이름
              </NewsEditLinkBtnInput>
            )}
          />

          <Controller
            name="link"
            control={control}
            render={({ field }) => (
              <NewsEditLinkBtnInput
                {...field}
                placeholder="링크를 삽입해주세요."
              >
                버튼 링크
              </NewsEditLinkBtnInput>
            )}
          />
        </section>

        <button
          type="button"
          className="flex items-center gap-[10px] mt-[18px] mb-[100px] p-small-medium cursor-pointer"
          onClick={() => setValue("visible", !visible)}
        >
          <img src={visible ? ic_check_colored : ic_check_mono} alt="" />
          버튼을 화면에 보여주기
        </button>

        <div className="flex justify-end gap-[28px] pb-[70px]">
          <button
            type="button"
            className="w-[164px] h-[48px] p-medium-bold text-white rounded-[5px] bg-[#BABABA] cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </button>
          <button
            type="submit"
            className="w-[164px] h-[48px] p-medium-bold text-white rounded-[5px] bg-[#00AEEF] cursor-pointer transition-colors hover:bg-[#059DD7] active:bg-[#058BBF] disabled:bg-[#B2E6FA] disabled:cursor-default"
            disabled={
              !isCategoryValid ||
              watch("title") === "" ||
              watch("content") === ""
            }
          >
            등록
          </button>
        </div>
      </section>
    </form>
  );
};

export default NewsEdit;
