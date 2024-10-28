import React from "react";
import Style from "./RegisterPage.module.css";
import TextInput from "../../components/UI/Inputs/TextInput/TextInput.tsx";
import BaseButton from "../../components/UI/Buttons/BaseButton/BaseButton.tsx";
import BasePanel from "../../components/UI/Panels/BasePanel/BasePanel.tsx";
import Text from "../../components/UI/Text/Text/Text.tsx";
import { LoginRoute } from "../../routes/login.tsx";
import { Link } from "@tanstack/react-router";
import ErrorLabel from "../../components/UI/ErrorLabel/ErrorLabel.tsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HandlerRegisterRequest } from "../../api/client/api.ts";
import { useRegister } from "../../hooks/auth/useRegister.ts";
import * as yup from "yup";
import { translateError } from "../../helpers/apiErrors.ts";
import { minMsg, requiredMsg } from "../../helpers/validatorMessages.ts";

const RegisterPage: React.FC = () => {
  const { mutate, isLoading, error } = useRegister();

  const schema = yup.object({
    username: yup.string().min(4, minMsg(4)).required(requiredMsg),
    password: yup.string().min(8, minMsg(8)).required(requiredMsg),
    passwordConfirm: yup
      .string()
      .required(requiredMsg)
      .oneOf([yup.ref("password")], "Пароли не совпадают"),
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

  function processRegister(data: HandlerRegisterRequest) {
    mutate(data);
  }

  const displayError = translateError(error);

  return (
    <div className={Style.registerPage}>
      <BasePanel className={Style.panel}>
        <h2 className={Style.registerFormTitle}>Регистрация</h2>
        <Text align="center" size="small">
          Если у вас уже есть аккаунт,
          <br /> вы можете{" "}
          <Link to={LoginRoute}>
            <Text accent pointer span size="small">
              авторизоваться
            </Text>
          </Link>
        </Text>
        <form
          onSubmit={handleSubmit(processRegister)}
          className={Style.registerForm}
        >
          <TextInput
            className={Style.registerFormInput}
            {...register("username")}
            errorMessage={errors.username?.message}
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
          <TextInput
            {...register("passwordConfirm")}
            errorMessage={errors.passwordConfirm?.message}
            type="password"
            label="Подтверждение пароля"
            placeholder="Введите пароль ещё раз"
          />
          {displayError && <ErrorLabel text={displayError} />}
          <BaseButton isLoading={isLoading}>Зарегистрироваться</BaseButton>
        </form>
      </BasePanel>
    </div>
  );
};

export default RegisterPage;
