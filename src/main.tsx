import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/styles.css";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import api from "./api";
import { AuthProvider } from "./stores/authStore.tsx";
import { ScheduleProvider } from "./stores/scheduleStore.tsx";

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

api.initAxiosInterceptors();

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ScheduleProvider>
      <App />
    </ScheduleProvider>
  </AuthProvider>,
);
