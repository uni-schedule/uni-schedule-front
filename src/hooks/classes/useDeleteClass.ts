import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "../../api";
import { translateErrorWithFallback } from "../../helpers/apiErrors";

export function useDeleteClass() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["class delete"],
    mutationFn: async (id: number | string) =>
      await api.Class.classesDelete(Number(id)),
    onSuccess: () => {
      toast("Пара успешно удалена", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["classes all"] });
    },
    onError: (err) => {
      toast(translateErrorWithFallback(err, "Не удалось удалить пару"), {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
