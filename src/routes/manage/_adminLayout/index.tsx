import { createFileRoute, redirect } from "@tanstack/react-router";
import TeachersPage from "../../../pages/Manage/TeachersPage/TeachersPage.tsx";
import { LoginRoute } from "../../login.tsx";

export const ManageRoute = "/manage";
export const Route = createFileRoute("/manage/_adminLayout/")({
  component: TeachersPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthorized) {
      throw redirect({
        to: LoginRoute,
      });
    }
    throw redirect({
      to: "/manage/teachers",
    });
  },
});
