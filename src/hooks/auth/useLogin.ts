import { useMutation } from "react-query";
import api from "../../api";
import { HandlerLoginRequest } from "../../api/client";
import { setTokens } from "../../stores/tokenStore";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../stores/authStore";
import { ManageRoute } from "../../routes/manage/_adminLayout/index";
import { useEffect } from "react";

export function useLogin() {
  const navigate = useNavigate();
  const { isAuthorized, setAuthorized } = useAuth();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: HandlerLoginRequest) => api.Auth.authLogin(data),
    onSuccess: (data) => {
      setTokens({
        access_token: data.data.access_token!,
        refresh_token: data.data.refresh_token!,
      });
      setAuthorized(true);
    },
  });

  useEffect(() => {
    if (isAuthorized) {
      navigate({ to: ManageRoute });
    }
  }, [isAuthorized]);

  return { mutate, data, error, isError, isLoading, isSuccess };
}
