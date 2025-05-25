/** 오늘 날짜 */
export const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0].replace(/-/g, ".");
};
