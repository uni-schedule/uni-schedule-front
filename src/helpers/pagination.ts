export const isPageInvalid = (page: number, totalPages: number) =>
  page > 0 && page <= totalPages;
