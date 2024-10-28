import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../stores/authStore";
import { useMutation } from "react-query";
import api from "../../api";
import { HandlerRegisterRequest } from "../../api/client";
import { setTokens } from "../../stores/tokenStore";
import { useEffect } from "react";
import { ManageRoute } from "../../routes/manage/_adminLayout/index";

export function useRegister() {
  const navigate = useNavigate();
  const { isAuthorized, setAuthorized } = useAuth();
  const { mutate, data, error, isLoading, isSuccess, isError } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: HandlerRegisterRequest) =>
      api.Auth.authRegister(data),
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
