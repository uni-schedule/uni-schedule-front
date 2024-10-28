import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContextType } from "../stores/authStore.tsx";

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
