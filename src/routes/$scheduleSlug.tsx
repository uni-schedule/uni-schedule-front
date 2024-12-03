import { createFileRoute } from "@tanstack/react-router";
import PublicSchedulePage from "../pages/PublicSchedulePage/PublicSchedulePage";

export const Route = createFileRoute("/$scheduleSlug")({
  component: PublicSchedulePage,
});
