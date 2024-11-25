import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "../../api";

export function useDeleteEntry() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["entry delete"],
    mutationFn: async (id: number | string) =>
      await api.Entry.entryDelete(Number(id)),
    onSuccess: () => {
      toast("Расписание успешно изменено", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["entries all", "schedule view"] });
    },
    onError: () => {
      toast("Не удалось изменить расписание", {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
