import { useEffect } from "react";
import { useQuery } from "react-query";
import api from "../../api";
import { pageToOffset } from "../../helpers/api";
import { usePagination } from "../common/usePagination";

async function getMySchedules(limit: number, page: number) {
  const response = await api.Schedule.scheduleGetMy(
    limit,
    pageToOffset(page, limit),
  );

  return response;
}

export function useGetMySchedules(limit: number) {
  const { page, pages, setPage, setPages } = usePagination();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["schedules my", page],
    queryFn: async () => await getMySchedules(limit, page),
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!isSuccess) return;
    setPages(data.pagination?.pages!);
  }, [isSuccess]);

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
