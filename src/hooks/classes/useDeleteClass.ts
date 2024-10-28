import { useMutation, useQueryClient } from "react-query";
import api from "../../api";
import { toast } from "react-toastify";

export function useDeleteClass() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["class delete"],
    mutationFn: async (id: number | string) =>
      api.Class.classesDelete(Number(id)),
    onSuccess: () => {
      toast("Пара успешно удалена", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["classes all"] });
    },
    onError: () => {
      toast("Не удалось удалить пару", {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
