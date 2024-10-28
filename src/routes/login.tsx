import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import { ManageRoute } from "./manage/_adminLayout/index.tsx";

export const LoginRoute = "/login";
export const Route = createFileRoute(LoginRoute)({
  component: LoginPage,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthorized) {
      throw redirect({
        to: ManageRoute,
      });
    }
  },
});
