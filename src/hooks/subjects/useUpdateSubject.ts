import { useMutation, useQueryClient } from "react-query";
import api from "../../api";
import { toast } from "react-toastify";
import { DomainUpdateSubjectDTO } from "../../api/client";

interface UpdateSubjectData {
  id: number | string;
  data: DomainUpdateSubjectDTO;
}

export function useUpdateSubject() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["subject update"],
    mutationFn: async (data: UpdateSubjectData) =>
      api.Subject.subjectsUpdate(Number(data.id), data.data),
    onSuccess: () => {
      toast("Предмет успешно обновлён", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["subjects all"] });
    },
    onError: () => {
      toast("Не удалось обновить предмет", {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
