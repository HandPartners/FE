// 모달 전체 레이아웃
interface PortfolioModalProps {
  children: React.ReactNode;
  marginTop: string;
}

const PortfolioModalLayout: React.FC<PortfolioModalProps> = ({
  children,
  marginTop,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center  z-50 bg-[rgba(217,217,217,0.3)] backdrop-blur-sm">
      <div
        className={`${marginTop} bg-white py-[36px] px-[30px] rounded-lg w-[500px] h-fit relative flex flex-col gap-[28px]`}
      >
        {children}
      </div>
    </div>
  );
};
export default PortfolioModalLayout;
