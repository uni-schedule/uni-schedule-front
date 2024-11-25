import { useQuery } from "react-query";
import api from "../../api";

async function getScheduleView(slug: string) {
  const response = await api.Schedule.scheduleGetSlug(slug);

  return response;
}

export function useGetScheduleView(slug: string) {
  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ["schedule view", slug],
    queryFn: async () => await getScheduleView(slug),
    select: (data) => data.data,
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    refetch,
  };
}
