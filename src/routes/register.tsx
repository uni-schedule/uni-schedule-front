import { createFileRoute, redirect } from "@tanstack/react-router";
import RegisterPage from "../pages/RegisterPage/RegisterPage.tsx";
import { ManageRoute } from "./manage/_adminLayout/index.tsx";

export const RegisterRoute = "/register";
export const Route = createFileRoute(RegisterRoute)({
  component: RegisterPage,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthorized) {
      throw redirect({
        to: ManageRoute,
      });
    }
  },
});
