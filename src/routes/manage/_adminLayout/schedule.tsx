import { createFileRoute } from "@tanstack/react-router";
import SchedulePage from "../../../pages/Manage/SchedulePage/SchedulePage";

export const Route = createFileRoute("/manage/_adminLayout/schedule")({
  component: SchedulePage,
});
