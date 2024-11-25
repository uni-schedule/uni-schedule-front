import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "../../api";
import { DomainCreateSubjectDTO } from "../../api/client";

export function useCreateSubject() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["subject create"],
    mutationFn: async (data: DomainCreateSubjectDTO) =>
      await api.Subject.subjectsCreate(data),
    onSuccess: () => {
      toast("Предмет успешно добавлен", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["subjects all"] });
    },
    onError: () => {
      toast("Не удалось добавить предмет", {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
