import { useState, useEffect } from "react";

import useWindowWidth from "../../hooks/useWindowWidth";

import bannerImg1 from "../../assets/images/banner/main/main1.png";
import bannerImg2 from "../../assets/images/banner/main/main2.png";
import bannerImg3 from "../../assets/images/banner/main/main3.png";

const MainBanner = () => {
  const bannerImages = [bannerImg1, bannerImg2, bannerImg3];
  const [currentIndex, setCurrentIndex] = useState(0); // 진짜 배너

  const { md } = useWindowWidth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === bannerImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearTimeout(timeout); // 배너 index 바뀔 때마다 타이머 초기화
  }, [currentIndex]); // currentIndex가 바뀔 때마다 useEffect 재실행됨

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === bannerImages.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? bannerImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative h-[200px] md:h-[500px]  w-screen  mt-[20px] md:mt-[40px]  ">
      <div className="relative w-full ">
        {bannerImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`배너 ${idx + 1}`}
            className={`absolute top-0 left-0  w-full  h-[200px] md:h-[500px] flex-shrink-0 object-cover  transition-opacity duration-1000 ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>

      {/* 버튼 */}
      <div className="absolute z-10 left-[5.2%] top-[40%] cursor-pointer">
        {md && (
          <button
            onClick={() => {
              goToPrev();
            }}
            className="cursor-pointer group"
            // WAI-ARIA 속성 추가
            aria-label="이전 배너"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="md:w-[50px] md:h-[74px] w-[20.27px] h-[30px]"
              viewBox="0 0 50 74"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M35.3514 15.7763V10.1901C35.3514 9.70595 34.9754 9.43857 34.7215 9.73486L12.7098 35.1796C12.5228 35.3948 12.3715 35.6705 12.2674 35.9854C12.1633 36.3004 12.1092 36.6464 12.1092 36.9971C12.1092 37.3477 12.1633 37.6937 12.2674 38.0087C12.3715 38.3237 12.5228 38.5993 12.7098 38.8145L34.7215 64.2593C34.9803 64.5556 35.3514 64.2882 35.3514 63.804V58.2179C35.3514 57.8638 35.2391 57.5241 35.0536 57.3073L17.4754 37.0007L35.0536 16.6868C35.2391 16.47 35.3514 16.1304 35.3514 15.7763Z"
                className="transition-colors duration-300 fill-white group-hover:fill-[#BABABA] cursor-pointer"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="absolute z-10 right-[5.2%] top-[40%] cursor-pointer">
        {md && (
          <button
            onClick={() => {
              goToNext();
            }}
            className="cursor-pointer group"
            // WAI-ARIA 속성 추가
            aria-label="다음 배너"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="md:w-[50px] md:h-[74px] w-[20.27px] h-[30px]"
              viewBox="0 0 50 74"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M37.3876 35.1797L15.3759 9.73499C15.3183 9.66797 15.2492 9.62632 15.1764 9.61482C15.1036 9.60333 15.0301 9.62245 14.9644 9.66999C14.8986 9.71754 14.8432 9.79158 14.8046 9.8836C14.7659 9.97563 14.7456 10.0819 14.746 10.1903V15.7764C14.746 16.1305 14.8583 16.4701 15.0438 16.6869L32.622 37.0008L15.0438 57.3147C14.8534 57.5315 14.746 57.8711 14.746 58.2252V63.8114C14.746 64.2955 15.122 64.5629 15.3759 64.2666L37.3876 38.8219C37.5747 38.6059 37.726 38.3296 37.8301 38.0141C37.9342 37.6985 37.9883 37.352 37.9883 37.0008C37.9883 36.6496 37.9342 36.3031 37.8301 35.9875C37.726 35.672 37.5747 35.3957 37.3876 35.1797Z"
                className="transition-colors duration-300 fill-white group-hover:fill-[#BABABA] cursor-pointer"
              />
            </svg>
          </button>
        )}
      </div>

      {/* 인디케이터 */}
      <div className="absolute  flex gap-[20px] transform -translate-x-1/2 z-100 md:bottom-[40px] bottom-[20px] left-[50%]">
        {bannerImages.map((_, idx) => (
          <span
            key={idx}
            className={` text-[7px] md:text-[12px] transition-all duration-300 text-[var(--grey4)]`}
          >
            {currentIndex === idx ? "○" : "●"}
          </span>
        ))}
      </div>
    </div>
  );
};
export default MainBanner;
