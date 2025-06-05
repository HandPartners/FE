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
  onSubmit: () => void;
}

const ProtfolioAddModal: React.FC<ProtfolioAddModalProps> = ({
  onClose,
  onSubmit,
  formData,
  setFormData,
}) => {
  const isFormInvalid =
    !formData.name.trim() ||
    !formData.content.trim() ||
    !formData.logo ||
    (formData.logo instanceof File && formData.logo.size === 0);

  return (
    <PortfolioModalLayout marginTop="my-auto" onClickBG={onClose}>
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

      <div className="flex flex-row gap-[28px]">
        <ModalButton
          name="취소"
          backGroundColor="bg-[var(--grey4)]"
          font="p-medium-bold"
          textColor="text-[var(--white)]"
          onClick={onClose}
        />
        <ModalButton
          name="등록"
          backGroundColor="bg-[var(--sub)]"
          font="p-medium-bold"
          textColor="text-[var(--white)]"
          onClick={onSubmit}
          disabled={isFormInvalid}
          disabledColor="bg-[#B2E6FA]"
        />
      </div>
    </PortfolioModalLayout>
  );
};

export default ProtfolioAddModal;
