import { useState } from "react";

export function usePagination() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  return {
    page,
    setPage,
    pages,
    setPages,
  };
}
