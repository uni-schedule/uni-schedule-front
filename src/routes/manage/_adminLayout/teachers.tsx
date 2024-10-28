import { createFileRoute } from "@tanstack/react-router";
import TeachersPage from "../../../pages/Manage/TeachersPage/TeachersPage";

export const Route = createFileRoute("/manage/_adminLayout/teachers")({
  component: TeachersPage,
});
