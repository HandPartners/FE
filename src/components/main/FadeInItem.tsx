import React from "react";
import useFadeIn from "../../hooks/useFadeIn";
interface FadeInItemProps {
  children: React.ReactNode;
}

const FadeInItem: React.FC<FadeInItemProps> = ({ children }) => {
  const { ref, isVisible } = useFadeIn();

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
};

export default FadeInItem;
