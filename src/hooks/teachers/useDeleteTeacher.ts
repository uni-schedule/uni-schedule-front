import { useMutation, useQueryClient } from "react-query";
import api from "../../api";
import { toast } from "react-toastify";

export function useDeleteTeacher() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["teacher delete"],
    mutationFn: async (id: number | string) =>
      api.Teacher.teacherDelete(Number(id)),
    onSuccess: () => {
      toast("Преподаватель успешно удалён", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["get teachers"] });
    },
    onError: () => {
      toast("Не удалось удалить преподавателя", {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
