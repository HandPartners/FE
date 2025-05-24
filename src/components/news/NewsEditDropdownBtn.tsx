import clsx from "clsx";

import ic_news_selected from "../../assets/images/news/ic_news_selected.svg";

interface NewsEditDropdownBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

const NewsEditDropdownBtn: React.FC<NewsEditDropdownBtnProps> = ({
  children,
  selected,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "relative pl-[16px] pr-[26px] w-full p-medium-medium text-start cursor-pointer ",
        selected && "text-[#2E3093]"
      )}
      {...props}
    >
      {children}
      {selected && (
        <img
          className="absolute right-[11px] top-1/2 -translate-y-1/2"
          src={ic_news_selected}
          alt="ic_news_selected"
        />
      )}
    </button>
  );
};

export default NewsEditDropdownBtn;
