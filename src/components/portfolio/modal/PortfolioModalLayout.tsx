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
  // 모달 열릴 때 body 스크롤 방지
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle; // cleanup
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex justify-center  min-h-screen  overflow-y-auto z-50 bg-[rgba(217,217,217,0.3)] backdrop-blur-sm border"
      onClick={onClickBG}
    >
      <div
        className={`${marginTop} bg-white py-[36px] px-[30px] rounded-lg w-[500px] h-fit relative flex flex-col gap-[28px]`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
export default PortfolioModalLayout;
