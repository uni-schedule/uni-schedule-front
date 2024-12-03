import { AxiosError } from "axios";
import { useQuery } from "react-query";
import api from "../../api";

async function getScheduleView(slug: string) {
  const response = await api.Schedule.scheduleGetSlug(slug);

  return response;
}

export function useGetScheduleView(slug: string) {
  const { data, isLoading, isSuccess, isError, refetch, error } = useQuery({
    queryKey: ["schedule view", slug],
    queryFn: async () => await getScheduleView(slug),
    select: (data) => data.data,
    retry(_, error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) return false;
      return true;
    },
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    refetch,
    error,
  };
}
