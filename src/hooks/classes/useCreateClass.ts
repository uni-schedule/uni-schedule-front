import { useMutation, useQueryClient } from "react-query";
import api from "../../api";
import { toast } from "react-toastify";
import { DomainCreateClassDTO } from "../../api/client";

export function useCreateClass() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["class create"],
    mutationFn: async (data: DomainCreateClassDTO) =>
      api.Class.classesCreate(data),
    onSuccess: () => {
      toast("Пара успешно добавлена", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["classes all"] });
    },
    onError: () => {
      toast("Не удалось добавить пару", {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
