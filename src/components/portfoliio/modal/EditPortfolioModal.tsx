// 수정/삭제 모달
// 포트폴리오 등록 모달
import ModalButton from "./ModalButton";
import PortfolioModalLayout from "./PortfolioModalLayout";
import PortfolioModalForm from "./PortfolioModalForm";
import type { AddPortfolioBody } from "../../../api/PortfolioApi";

interface ProtfolioAddModalProps {
  onClose?: () => void;
  onDelete?: () => void;
  onModify?: () => void;
  formData: AddPortfolioBody;
  setFormData: React.Dispatch<React.SetStateAction<AddPortfolioBody>>;
  onSubmit?: () => void;
}

const EditPortfolioModal: React.FC<ProtfolioAddModalProps> = ({
  onClose,
  onDelete,
  formData,
  setFormData,
  onModify,
}) => {
  return (
    <PortfolioModalLayout>
      <h2 className="text-center h2-bold">포트폴리오</h2>
      <PortfolioModalForm
        formData={formData}
        onFileChange={(file) => {
          if (file) {
            setFormData((prev) => ({ ...prev, logo: file }));
          }
        }}
        onChange={(field, value) =>
          setFormData((prev) => ({ ...prev, [field]: value }))
        }
      />

      {/* 버튼 */}
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-row gap-[28px]">
          <ModalButton
            name="삭제"
            backGroundColor="bg-[#EB4F52]"
            font="p-medium-bold"
            textColor="text-[var(--white)]"
            onClick={onDelete}
          />
          <ModalButton
            name="수정"
            backGroundColor="bg-[var(--sub)]"
            font="p-medium-bold"
            textColor="text-[var(--white)]"
            onClick={onModify}
          />
        </div>
        <ModalButton
          name="닫기"
          backGroundColor="bg-[#BABABA]"
          font="p-medium-bold"
          textColor="text-[var(--white)]"
          onClick={onClose}
        />
      </div>
    </PortfolioModalLayout>
  );
};

export default EditPortfolioModal;
