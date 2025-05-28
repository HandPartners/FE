// 포트폴리오 모달의 입력 폼
import type { AddPortfolioBody } from "../../../api/PortfolioApi";
import { useRef } from "react";
import Select from "react-select";
import DropdownIndicator from "./select/DropdownIndicator";
import { categoryOptions } from "../../../constants/categoryOptions";
import { selectStyles } from "../../../constants/selectStyles";

interface PortfolioModalFormProps {
  formData: AddPortfolioBody;
  onChange?: (field: string, value: string) => void;
  onFileChange?: (file: File | null) => void;
}

const PortfolioModalForm: React.FC<PortfolioModalFormProps> = ({
  formData,
  onChange,
  onFileChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filteredOptions = categoryOptions.filter((option) => option.value);

  const getLogoText = (logo: File | string) => {
    if (logo instanceof File) return logo.name || "파일을 선택해주세요.";
    return logo.split("/").pop() || "파일을 선택해주세요.";
  };

  const selectedOption = categoryOptions.find(
    (opt) => opt.value === formData.category
  );

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-[8px]">
        <p className="p-medium-medium text-[var(--grey6)]">카테고리</p>
        <Select
          options={filteredOptions}
          value={selectedOption}
          onChange={(selected) => {
            if (selected) onChange?.("category", selected.value);
          }}
          styles={selectStyles}
          isSearchable={false}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: DropdownIndicator,
          }}
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="p-medium-medium text-[var(--grey6)]">회사명</p>
        <input
          className="w-full h-[60px] bg-[var(--grey50)] rounded-[5.967px]  px-[20px]  cursor-pointer"
          placeholder="회사명을 입력해주세요."
          value={formData.name}
          onChange={(e) => onChange?.("name", e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="p-medium-medium text-[var(--grey6)]">회사 소개</p>
        <div className="relative">
          <input
            className="relative w-full h-[60px] bg-[var(--grey50)] rounded-[5.967px] px-[20px]  cursor-pointer"
            placeholder="회사 소개를 입력해주세요."
            maxLength={40}
            value={formData.content}
            onChange={(e) => onChange?.("content", e.target.value)}
          />
          <div className="absolute p-medium-regular top-[18px] right-[15px] text-[var(--grey4)]">
            {formData.content.length}/40
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="p-medium-medium text-[var(--grey6)]">회사 로고</p>
        <div className="relative">
          <input
            ref={fileInputRef}
            className="hidden "
            placeholder="파일을 선택해주세요."
            type="file"
            accept="image/*"
            onChange={(e) => onFileChange?.(e.target.files?.[0] || null)}
          />
          <div className="w-[full] h-[60px] bg-[var(--grey50)] rounded-[5.967px] gap-[10px] px-[10px] flex items-center justify-between  whitespace-nowrap">
            <span
              className={`w-full ml-[10px]  truncate overflow-hidden ${
                getLogoText(formData.logo) === "파일을 선택해주세요."
                  ? "text-[var(--grey5)]"
                  : "text-[var(--grey1)]"
              }`}
            >
              {getLogoText(formData.logo)}
            </span>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className=" w-fit p-[10px] p-small-bold bg-[var(--sub)] rounded-[10px] text-[var(--white)] cursor-pointer whitespace-nowrap"
            >
              파일 선택
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModalForm;
