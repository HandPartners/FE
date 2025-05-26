import { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";
import selectDownArrow from "../../../../assets/icons/ic_down_arrow.svg";
import selectUpArrow from "../../../../assets/icons/ic_up_arrow.svg";
import type { Category } from "../../../../types/category";

const DropdownIndicator = (props: DropdownIndicatorProps<Category, false>) => {
  const isOpen = props.selectProps.menuIsOpen;

  return (
    <components.DropdownIndicator {...props}>
      <img
        src={isOpen ? selectUpArrow : selectDownArrow}
        alt="드롭다운 화살표"
        className="w-[16px] h-[16px] object-contain"
      />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
