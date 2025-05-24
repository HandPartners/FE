// 모달에 사용되는 버튼

interface ModalButtonProps {
  name: string;
  backGroundColor: string;
  font: string;
  textColor: string;
  onClick?: () => void;
}
const ModalButton: React.FC<ModalButtonProps> = ({
  name,
  backGroundColor,
  textColor,
  font,
  onClick,
}) => {
  return (
    <button
      className={`${backGroundColor} ${font} ${textColor} py-[14px] rounded-[5px] w-full h-[52px] cursor-pointer`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default ModalButton;
