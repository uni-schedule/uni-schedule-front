import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "../../api";
import { DomainCreateClassDTO } from "../../api/client";
import { translateErrorWithFallback } from "../../helpers/apiErrors";

export function useCreateClass() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["class create"],
    mutationFn: async (data: DomainCreateClassDTO) =>
      await api.Class.classesCreate(data),
    onSuccess: () => {
      toast("Пара успешно добавлена", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["classes all"] });
    },
    onError: (err) => {
      toast(translateErrorWithFallback(err, "Не удалось добавить пару"), {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
