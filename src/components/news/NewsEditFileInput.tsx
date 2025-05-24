import { useRef, useState, type PropsWithChildren } from "react";
import type React from "react";

type NewsEditFileInputProps = {
  multiple?: boolean;
};

const NewsEditFileInput: React.FC<
  PropsWithChildren<NewsEditFileInputProps>
> = ({ children, multiple = false }) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selected = Array.from(event.target.files);

    if (multiple) {
      setFiles((prev) => [...prev, ...selected]);
    } else {
      setFiles(selected.length > 0 ? [selected[0]] : []);
    }
    event.target.value = "";
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const renderSummary = () => {
    if (files.length === 0) {
      return <span className="text-[#9E9E9E]">파일을 선택해 주세요</span>;
    }
    if (!multiple) {
      return (
        <span className="w-[306px] text-[#9E9E9E] truncate">
          {files[0].name}
        </span>
      );
    }
    // multi: comma-join
    const names = files.map((f) => f.name).join(", ");
    const display = names.length > 40 ? names.slice(0, 40) + "..." : names;
    return (
      <span className="text-[#9E9E9E] overflow-hidden whitespace-nowrap">
        {display}
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
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* multiple */}
      {multiple && files.length > 0 && (
        <ul className="mt-[2px] flex flex-col gap-[3px]">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between w-full text-[#9E9E9E]"
            >
              <span className="truncate">{file.name}</span>
              <button
                className="text-[#9E9E9E]"
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
