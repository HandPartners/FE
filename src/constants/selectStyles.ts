import type { StylesConfig } from "react-select";
import type { Category } from "../types/category"; // 옵션 타입 import

export const selectStyles: StylesConfig<Category, false> = {
  control: (base) => ({
    ...base,
    height: 60,
    borderRadius: "5.967px",
    backgroundColor: "var(--grey50)",
    paddingLeft: "20px",
    paddingRight: "20px",
    cursor: "pointer",
    border: "none",
    // 포커스 상태일 때 border 및 boxShadow 제거
    borderColor: "transparent",
    boxShadow: "none",
    "&:hover": {
      borderColor: "transparent",
    },
  }),
  option: (base) => ({
    ...base,
    backgroundColor: "white",
    color: "var(--grey6)",

    fontSize: "16px",
    fontWeight: 500,
    borderBottom: "1px solid #e5e7eb",
    cursor: "pointer",
    "&:last-child": {
      borderBottom: "none",
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    padding: "0 18px",
    borderRadius: "5px",
  }),
};
