import { createFileRoute } from "@tanstack/react-router";
import ClassesPage from "../../../pages/Manage/ClassesPage/ClassesPage";

export const Route = createFileRoute("/manage/_adminLayout/classes")({
  component: ClassesPage,
});
