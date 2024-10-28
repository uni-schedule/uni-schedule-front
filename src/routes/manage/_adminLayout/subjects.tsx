import { createFileRoute } from "@tanstack/react-router";
import SubjectsPage from "../../../pages/Manage/SubjectsPage/SubjectsPage";

export const Route = createFileRoute("/manage/_adminLayout/subjects")({
  component: SubjectsPage,
});
