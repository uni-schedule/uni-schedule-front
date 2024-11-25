import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "../../api";
import { HandlerCreateScheduleRequest } from "../../api/client";

export function useCreateSchedule() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["schedule create"],
    mutationFn: async (data: HandlerCreateScheduleRequest) =>
      await api.Schedule.scheduleCreate(data),
    onSuccess: () => {
      toast("Расписание успешно добавлено", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["schedules my"] });
    },
    onError: () => {
      toast("Не удалось добавить расписание", {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
