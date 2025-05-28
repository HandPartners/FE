interface AdminAddButtonProups {
  handleClick?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const AdminAddButton: React.FC<AdminAddButtonProups> = ({
  handleClick,
  title,
}) => {
  return (
    <button
      className="h5-bold cursor-pointer transition-colors duration-250 ease-in-out hover:text-[#FFF] flex bg-[var(--sub)] rounded-[30px] justify-center py-[16px] my-[50px] items-end w-[197px]"
      onClick={() => handleClick?.(true)}
    >
      {title}
    </button>
  );
};

export default AdminAddButton;
