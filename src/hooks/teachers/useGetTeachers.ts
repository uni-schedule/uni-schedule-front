import { useEffect } from "react";
import { useQuery } from "react-query";
import api from "../../api";
import { usePagination } from "../common/usePagination";
import { pageToOffset } from "../../helpers/api";
import { isPageInvalid } from "../../helpers/pagination";

async function getTeachers(scheduleId: number, limit: number, page: number) {
  const response = await api.Teacher.teacherGetAll(
    scheduleId,
    limit,
    pageToOffset(page, limit),
  );
  return response;
}

export function useGetTeachers(scheduleId: number, limit: number) {
  const { page, pages, setPage, setPages } = usePagination();

  const { data, isLoading, isSuccess, isError, isFetching } = useQuery({
    queryKey: ["get teachers", page, scheduleId],
    queryFn: () => getTeachers(scheduleId, limit, page),
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!isSuccess || (isFetching && !isLoading)) return;
    setPages(data.pagination?.pages!);

    if (isPageInvalid(data.pagination?.pages!, page))
      setPage(data.pagination?.pages!);
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
