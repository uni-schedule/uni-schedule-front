import { useMutation, useQueryClient } from "react-query";
import api from "../../api";
import { toast } from "react-toastify";
import { DomainTeacherUpdateDTO } from "../../api/client";

interface UpdateTeacherData {
  id: number | string;
  data: DomainTeacherUpdateDTO;
}

export function useUpdateTeacher() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["teacher update"],
    mutationFn: async (data: UpdateTeacherData) =>
      api.Teacher.teacherUpdate(Number(data.id), data.data),
    onSuccess: () => {
      toast("Преподаватель успешно обновлён", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["get teachers"] });
    },
    onError: () => {
      toast("Не удалось обновить преподавателя", {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
