// 모달 전체 레이아웃
import { useEffect } from "react";

interface PortfolioModalProps {
  children: React.ReactNode;
  marginTop: string;
  onClickBG?: () => void;
}

const PortfolioModalLayout: React.FC<PortfolioModalProps> = ({
  children,
  marginTop,
  onClickBG,
}) => {
  useEffect(() => {
    // 현재 스크롤 위치를 저장
    const scrollY = window.scrollY;

    // body를 고정해서 스크롤 방지
    document.body.style.position = "fixed"; // body를 고정
    document.body.style.top = `-${scrollY}px`; // 고정 위치를 현재 스크롤 위치로 설정
    document.body.style.overflowY = "scroll";
    document.body.style.width = "100%"; // 고정 시 일부 브라우저에서 가로 스크롤 생기는 문제 방지

    //cleanup 함수 (모달 닫힐 때 실행)
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflowY = "";
      document.body.style.width = "";

      // 모달 열기 전 위치로 스크롤 복구
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex justify-center  min-h-screen  z-50 bg-[rgba(217,217,217,0.3)] backdrop-blur-sm overflow-y-auto"
      onClick={onClickBG}
    >
      <div
        className={`${marginTop} bg-white py-[36px] px-[30px] rounded-lg w-[89.3%] max-w-[500px] md:w-[500px] h-fit relative flex flex-col gap-[28px]`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
export default PortfolioModalLayout;
