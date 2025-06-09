import type React from "react";

interface NewsEditLinkBtnInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children: string;
}

const NewsEditLinkBtnInput: React.FC<NewsEditLinkBtnInputProps> = ({
  children,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-[8px] w-[356px] ">
      <p className="p-medium-medium text-[#777]">{children}</p>
      <input
        className="py-[10px] pl-[20px] pr-[10px] h-[60px]   bg-[#f7f9fa] rounded-[12px] focus:outline-none focus:ring-0 focus:bg-[#f7f9fa]"
        type="text"
        {...props}
      />
    </div>
  );
};

export default NewsEditLinkBtnInput;
