import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminLayout } from "../../components/layouts/AdminLayout/AdminLayout";

export const Route = createFileRoute("/manage/_adminLayout")({
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});
