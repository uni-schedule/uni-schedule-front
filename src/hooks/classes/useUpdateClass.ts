import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "../../api";
import { DomainUpdateClassDTO } from "../../api/client";
import { translateErrorWithFallback } from "../../helpers/apiErrors";

interface UpdateClassData {
  id: number | string;
  data: DomainUpdateClassDTO;
}

export function useUpdateClass() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["class update"],
    mutationFn: async (data: UpdateClassData) =>
      await api.Class.classesUpdate(Number(data.id), data.data),
    onSuccess: () => {
      toast("Пара успешно обновлена", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["classes all", "schedule view"] });
    },
    onError: (err) => {
      toast(translateErrorWithFallback(err, "Не удалось обновить пару"), {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
