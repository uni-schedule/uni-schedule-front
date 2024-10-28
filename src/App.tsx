import AppWrapper from "./components/app/AppWrapper.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./main.tsx";
import { useAuth } from "./stores/authStore.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const queryClient = new QueryClient();

function App() {
  const auth = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          limit={3}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <RouterProvider router={router} context={{ auth }} />
      </AppWrapper>
    </QueryClientProvider>
  );
}

export default App;
