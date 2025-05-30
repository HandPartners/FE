import useWindowWidth from "../hooks/useWindowWidth";
interface AdminAddButtonProups {
  handleClick?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const AdminAddButton: React.FC<AdminAddButtonProups> = ({
  handleClick,
  title,
}) => {
  const windowWidth = useWindowWidth();
  const isMobile = !windowWidth.md;
  return (
    <button
      className={`cursor-pointer transition-colors duration-250 ease-in-out hover:text-[#FFF] flex bg-[var(--sub)] rounded-[30px] justify-center py-[10px] my-[25px] md:py-[16px] md:my-[50px] items-end  w-[152px] md:w-[197px] ${
        isMobile ? "p-medium-bold" : "h5-bold"
      }`}
      onClick={() => handleClick?.(true)}
    >
      {title}
    </button>
  );
};

export default AdminAddButton;
