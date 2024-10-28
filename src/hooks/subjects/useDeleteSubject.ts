import { useMutation, useQueryClient } from "react-query";
import api from "../../api";
import { toast } from "react-toastify";

export function useDeleteSubject() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["subject delete"],
    mutationFn: async (id: number | string) =>
      api.Subject.subjectsDelete(Number(id)),
    onSuccess: () => {
      toast("Предмет успешно удалён", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["subjects all"] });
    },
    onError: () => {
      toast("Не удалось удалить предмет", {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
