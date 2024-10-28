import React from "react";
import Style from "./LoginPage.module.css";
import TextInput from "../../components/UI/Inputs/TextInput/TextInput.tsx";
import BaseButton from "../../components/UI/Buttons/BaseButton/BaseButton.tsx";
import BasePanel from "../../components/UI/Panels/BasePanel/BasePanel.tsx";
import Text from "../../components/UI/Text/Text/Text.tsx";
import { Link } from "@tanstack/react-router";
import { RegisterRoute } from "../../routes/register.tsx";
import ErrorLabel from "../../components/UI/ErrorLabel/ErrorLabel.tsx";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "../../hooks/auth/useLogin.ts";
import { HandlerLoginRequest } from "../../api/client/api.ts";
import { translateError } from "../../helpers/apiErrors.ts";
import { requiredMsg } from "../../helpers/validatorMessages.ts";

const LoginPage: React.FC = () => {
  const { mutate, isLoading, error } = useLogin();

  const schema = object({
    username: string().required(requiredMsg),
    password: string().required(requiredMsg),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  function login(data: HandlerLoginRequest) {
    mutate(data);
  }

  const displayError = translateError(error);

  return (
    <div className={Style.loginPage}>
      <BasePanel className={Style.panel}>
        <h2 className={Style.loginFormTitle}>Авторизация</h2>
        <Text align="center" size="small">
          Если у вас нет аккаунта,
          <br /> вы можете{" "}
          <Link to={RegisterRoute}>
            <Text accent pointer span size="small">
              зарегистрироваться
            </Text>
          </Link>
        </Text>
        <form onSubmit={handleSubmit(login)} className={Style.loginForm}>
          <TextInput
            {...register("username")}
            errorMessage={errors.username?.message}
            className={Style.loginFormInput}
            type="text"
            label="Логин"
            placeholder="Введите логин"
          />
          <TextInput
            {...register("password")}
            errorMessage={errors.password?.message}
            type="password"
            label="Пароль"
            placeholder="Введите пароль"
          />
          {displayError && <ErrorLabel text={displayError} />}
          <BaseButton isLoading={isLoading}>Войти</BaseButton>
        </form>
      </BasePanel>
    </div>
  );
};

export default LoginPage;
