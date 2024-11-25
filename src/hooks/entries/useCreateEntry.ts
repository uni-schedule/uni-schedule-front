import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "../../api";
import { DomainCreateScheduleEntryDTO } from "../../api/client";

export function useCreateEntry() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["entry create"],
    mutationFn: async (data: DomainCreateScheduleEntryDTO) =>
      await api.Entry.entryCreate(data),
    onSuccess: () => {
      toast("Расписание успешно изменено", {
        type: "success",
      });
      client.invalidateQueries({ queryKey: ["entries all", "schedule view"] });
    },
    onError: () => {
      toast("Не удалось изменить расписание", {
        type: "error",
      });
    },
  });

  return { mutate, data, error, isError, isLoading, isSuccess };
}
