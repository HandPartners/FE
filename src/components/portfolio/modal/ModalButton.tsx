// 모달에 사용되는 버튼

interface ModalButtonProps {
  name: string;
  backGroundColor: string;
  disabledColor?: string;
  font: string;
  textColor: string;
  onClick?: () => void;
  disabled?: boolean;
}
const ModalButton: React.FC<ModalButtonProps> = ({
  name,
  backGroundColor,
  textColor,
  font,
  onClick,
  disabled,
  disabledColor,
}) => {
  return (
    <button
      disabled={disabled}
      className={` ${font} ${textColor} py-[14px] rounded-[5px] w-full h-[52px]   ${
        disabled
          ? `${disabledColor} cursor-default`
          : `${backGroundColor} cursor-pointer`
      }
`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default ModalButton;
