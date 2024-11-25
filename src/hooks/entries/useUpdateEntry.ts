import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "../../api";
import { DomainUpdateScheduleEntryDTO } from "../../api/client";

export interface UpdateEntryData {
  id: number | string;
  data: DomainUpdateScheduleEntryDTO;
}

export function useUpdateEntry() {
  const client = useQueryClient();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["entry update"],
    mutationFn: async (data: UpdateEntryData) =>
      await api.Entry.entryUpdate(Number(data.id), data.data),
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
