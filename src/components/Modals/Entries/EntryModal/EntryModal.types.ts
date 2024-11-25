import { DomainClass } from "../../../../api/client";
import Nullable from "../../../../types/utility/Nullable";

export type EntryModalValues = Nullable<
  Omit<DomainClass, "id" | "schedule_id">
>;
