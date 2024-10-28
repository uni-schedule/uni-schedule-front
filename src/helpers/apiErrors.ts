import { HandlerErrorResponse } from "../api/client";
import { isAxiosError } from "axios";

const errors = {
  "Invalid login or password": "Неверный логин или пароль",
  "User not found": "Пользователь не найден",
  "Username already taken": "Логин уже занят",
  "Schedule not found": "Расписание не найдено",
} as Record<string, string>;

const unknownError = "Произошла неизвестная ошибка";

export const translateApiError = (error: string) => {
  if (!error) return null;
  return errors[error] || unknownError;
};

export const isApiError = (error: any) => {
  return isAxiosError<HandlerErrorResponse>(error);
};
export const getApiError = (error: any): HandlerErrorResponse | null => {
  if (!isApiError(error)) return null;
  return error.response!.data;
};

export const translateError = (error: any) => {
  const err = getApiError(error);
  if (!err) return;

  return translateApiError(err.error!);
};
