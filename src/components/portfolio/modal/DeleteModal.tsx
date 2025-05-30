import PortfolioModalLayout from "./PortfolioModalLayout";
import ModalButton from "./ModalButton";
import useWindowWidth from "../../../hooks/useWindowWidth";

interface ProtfolioAddModalProps {
  onClose?: () => void;
  onDelete?: () => void;
}

const DeleteModal: React.FC<ProtfolioAddModalProps> = ({
  onDelete,
  onClose,
}) => {
  const windowWidth = useWindowWidth();
  const isMobile = !windowWidth.md;

  return (
    <PortfolioModalLayout marginTop="mt-[340px]" onClickBG={onClose}>
      <section className="flex flex-col gap-[8px]">
        <h2 className={`text-center ${isMobile ? "h4-bold" : "h2-bold"}`}>
          삭제하시겠습니까?
        </h2>
        <p className="p-medium-regular text-[var(--grey6)] text-center">
          삭제된 포트폴리오는 복구가 불가능합니다.
        </p>
      </section>

      <div className="flex flex-row gap-[28px]">
        <ModalButton
          name="취소"
          backGroundColor="bg-[var(--grey4)]"
          font="p-medium-bold"
          textColor="text-[var(--white)]"
          onClick={onClose}
        />
        <ModalButton
          name="삭제"
          backGroundColor="bg-[#EB4F52]"
          font="p-medium-bold"
          textColor="text-[var(--white)]"
          onClick={onDelete}
        />
      </div>
    </PortfolioModalLayout>
  );
};

export default DeleteModal;
