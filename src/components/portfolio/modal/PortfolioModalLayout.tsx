// 모달 전체 레이아웃
import { useEffect } from "react";

interface PortfolioModalProps {
  children: React.ReactNode;
  marginTop: string;
}

const PortfolioModalLayout: React.FC<PortfolioModalProps> = ({
  children,
  marginTop,
}) => {
  useEffect(() => {
    // 현재 스크롤 위치를 저장
    const scrollY = window.scrollY;

    // modal이 열려있는 상태에서 다른 modal이 추가로 열릴 경우우
    const isModalOpen = document.body.classList.contains("modal-open");

    if (!isModalOpen) {
      document.body.style.top = `-${scrollY}px`;
    }
    document.body.classList.add("modal-open");

    document.body.style.overflowY = "hidden";
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
    <div className="fixed inset-0 flex justify-center  min-h-screen  z-50 bg-[rgba(217,217,217,0.3)] backdrop-blur-sm overflow-y-auto">
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
