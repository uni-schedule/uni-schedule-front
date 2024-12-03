import { createRouter } from "@tanstack/react-router";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { createRoot } from "react-dom/client";
import api from "./api";
import App from "./App.tsx";
import { routeTree } from "./routeTree.gen.ts";
import { AuthProvider } from "./stores/authStore.tsx";
import { ScheduleProvider } from "./stores/scheduleStore.tsx";
import "./styles/styles.css";

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

dayjs.extend(isoWeek);
api.initAxiosInterceptors();

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ScheduleProvider>
      <App />
    </ScheduleProvider>
  </AuthProvider>,
);
