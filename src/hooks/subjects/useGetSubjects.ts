import { useEffect } from "react";
import { useQuery } from "react-query";
import api from "../../api";
import { pageToOffset } from "../../helpers/api";
import { isPageInvalid } from "../../helpers/pagination";
import { usePagination } from "../common/usePagination";

async function getSubjects(scheduleId: number, limit: number, page: number) {
  const response = await api.Subject.subjectsGetAllSchedule(
    scheduleId,
    limit,
    pageToOffset(page, limit),
  );
  return response;
}

export function useGetSubjects(scheduleId: number, limit: number) {
  const { page, pages, setPage, setPages } = usePagination();

  const { data, isLoading, isSuccess, isError, isFetching } = useQuery({
    queryKey: ["subjects all", page, scheduleId],
    queryFn: async () => await getSubjects(scheduleId, limit, page),
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
