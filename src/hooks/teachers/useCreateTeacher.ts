import { useMutation, useQueryClient } from "react-query";
import { DomainTeacherCreateDTO } from "../../api/client";
import api from "../../api";
import { toast } from "react-toastify";

export function useCreateTeacher() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["teacher create"],
    mutationFn: async (data: DomainTeacherCreateDTO) =>
      api.Teacher.teacherCreate(data),
    onSuccess: () => {
      toast("Преподаватель успешно добавлен", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["get teachers"] });
    },
    onError: () => {
      toast("Не удалось добавить преподавателя", {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
