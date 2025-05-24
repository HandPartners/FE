const ScrollToTopButton = () => {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="cursor-pointer fixed bottom-[50px] right-[50px] z-50 w-[40px] h-[40px] rounded-full hover:bg-[#f5f5f5]  bg-[var(--white)] text-[20px] shadow-lg flex items-center justify-center hover:bg-opacity-80 transition-colors"
      style={{ boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.25)" }}
    >
      ⌅
    </button>
  );
};

export default ScrollToTopButton;
