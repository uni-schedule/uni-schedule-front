import { useMutation, useQueryClient } from "react-query";
import api from "../../api";
import { toast } from "react-toastify";
import { DomainUpdateClassDTO } from "../../api/client";

interface UpdateClassData {
  id: number | string;
  data: DomainUpdateClassDTO;
}

export function useUpdateClass() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["class update"],
    mutationFn: async (data: UpdateClassData) =>
      api.Class.classesUpdate(Number(data.id), data.data),
    onSuccess: () => {
      toast("Пара успешно обновлена", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["classes all"] });
    },
    onError: () => {
      toast("Не удалось обновить пару", {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
