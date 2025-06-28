import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import type React from "react";
import { newsEditStore } from "../../store/NewsEditStore";

type NewsEditFileInputProps = {
  multiple?: boolean;
  onChange?: (files: File[]) => void;
  existFileName?: string | string[] | File[];
  onRemoveExisting?: (index: number) => void;
};

const MAX_FILES = 10;

/**
 * 파일 입력 component
 * @param {boolean} [multiple] 파일 여러 개 선택 가능 여부
 * @param {function} [onChange] 파일이 변경 시 호출
 * @param {string | string[] | File[]} [existFileName] API로부터 받아온 기존 파일
 * @param {function} [onRemoveExisting] 기존 파일을 삭제 시 호출
 * @returns {JSX.Element}
 */
const NewsEditFileInput: React.FC<
  PropsWithChildren<NewsEditFileInputProps>
> = ({
  children,
  multiple = false,
  onChange,
  existFileName,
  onRemoveExisting,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 기존 파일 개수 계산 (string일 땐 1개, 배열일 땐 배열 길이)
  const existingFileArray = Array.isArray(existFileName)
    ? existFileName
    : existFileName
    ? [existFileName]
    : [];
  const existingFileCount = existingFileArray.length;
  const totalSelectedCount = existingFileCount + files.length;

  useEffect(() => {
    newsEditStore.setHasReachedLimit(totalSelectedCount >= MAX_FILES);
  }, [totalSelectedCount]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selected = Array.from(event.target.files);

    // 남은 슬롯만큼만 잘라서 추가
    const availableSlots = MAX_FILES - existingFileCount - files.length;
    if (availableSlots <= 0) {
      // 제한에 도달했으면 아무 것도 안 함
      event.target.value = "";
      alert("사진 추가는 10개까지만 가능합니다.");
      return;
    }
    const toAdd = selected.slice(0, availableSlots);

    if (multiple) {
      const updatedFiles = [...files, ...toAdd]; // 누적 반영
      setFiles(updatedFiles);
      onChange?.(updatedFiles); // ✅ 전체 전달
    } else {
      setFiles(toAdd.length > 0 ? [toAdd[0]] : []);
      onChange?.(toAdd);
    }
    event.target.value = "";
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const renderSummary = () => {
    const hasExisting = existingFileCount > 0;
    const hasNew = files.length > 0;

    if (!hasExisting && !hasNew) {
      return <span className="text-[#9E9E9E]">파일을 선택해 주세요</span>;
    }
    if (!multiple) {
      return (
        <span className="w-[306px] text-[#9E9E9E] truncate">
          {hasNew
            ? files[0].name
            : typeof existFileName === "string" &&
              existFileName.split("/").pop()}
        </span>
      );
    }
    // multi: comma-join
    if (hasNew) {
      const names = files.map((f) => f.name).join(", ");
      const display = names.length > 40 ? names.slice(0, 40) + "..." : names;
      return (
        <span className="text-[#9E9E9E] overflow-hidden whitespace-nowrap">
          {display}
        </span>
      );
    }
    return (
      <span className="text-[#9E9E9E] overflow-hidden whitespace-nowrap">
        {existingFileArray
          .map((f) => (typeof f === "string" ? f.split("/").pop() : f.name))
          .join(", ")}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-[8px] w-[356px]">
      <p className="p-medium-medium text-[#777]">{children}</p>

      <div className="flex items-center py-[10px] pl-[20px] pr-[10px] bg-[#f7f9fa] rounded-[12px]">
        <div className="w-[306px] truncate">{renderSummary()}</div>
        <button
          className="ml-3 p-[10px] bg-[#00b8ff] hover:bg-[#009ee6] text-white p-small-bold rounded-[14px] focus:outline-none cursor-pointer whitespace-nowrap"
          type="button"
          onClick={handleButtonClick}
        >
          파일 선택
        </button>
        <input
          type="file"
          multiple={multiple}
          ref={fileInputRef}
          className="hidden focus:outline-none focus:ring-0 focus:bg-[#f7f9fa]"
          onChange={handleFileChange}
          accept="image/jpeg, image/png, .jpg, .jpeg, .png"
        />
      </div>

      {multiple && (
        <ul className="mt-[2px] flex flex-col gap-[3px]">
          {/* 기존 file part */}
          {Array.isArray(existFileName) &&
            existFileName.map((file, index) => {
              const name =
                typeof file === "string" ? file.split("/").pop() : file.name;
              return (
                <li
                  key={`exist-${index}`}
                  className="flex items-center justify-between w-full text-[#9E9E9E]"
                >
                  <span className="truncate">{name}</span>
                  <button
                    type="button"
                    className="text-[#9E9E9E] cursor-pointer"
                    onClick={() => onRemoveExisting?.(index)}
                  >
                    X
                  </button>
                </li>
              );
            })}

          {/* 새로 선택된 file part */}
          {files.map((file, index) => (
            <li
              key={`new-${index}`}
              className="flex items-center justify-between w-full text-[#9E9E9E]"
            >
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                className="text-[#9E9E9E] cursor-pointer"
                onClick={() => handleRemove(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsEditFileInput;
