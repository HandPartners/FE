export const parseImgArrayJson = (
  jsonString: string | string[] | undefined
): string[] => {
  if (!jsonString) {
    return [];
  }

  if (typeof jsonString === "string") {
    try {
      const parsed = JSON.parse(jsonString);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  if (Array.isArray(jsonString)) {
    return jsonString;
  }

  return [];
};
