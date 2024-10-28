import { useEffect } from "react";
import { useQuery } from "react-query";
import api from "../../api";
import { usePagination } from "../common/usePagination";
import { pageToOffset } from "../../helpers/api";
import { isPageInvalid } from "../../helpers/pagination";

async function getClasses(scheduleId: number, limit: number, page: number) {
  const response = await api.Class.classesGetSchedule(
    scheduleId,
    limit,
    pageToOffset(page, limit),
  );
  return response;
}

export function useGetClasses(scheduleId: number, limit: number) {
  const { page, pages, setPage, setPages } = usePagination();

  const { data, isLoading, isSuccess, isError, isFetching } = useQuery({
    queryKey: ["classes all", page, scheduleId],
    queryFn: () => getClasses(scheduleId, limit, page),
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!isSuccess || (isFetching && !isLoading)) return;
    setPages(pages);

    if (isPageInvalid(pages, page)) setPage(pages);
  }, [isSuccess, isFetching]);

  return {
    page,
    setPage,
    pages,
    data,
    isLoading,
    isSuccess,
    isError,
  };
}
