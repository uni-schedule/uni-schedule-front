import { isAxiosError } from "axios";
import { HandlerErrorResponse } from "../api/client";

const errors = {
  "Invalid login or password": "Неверный логин или пароль",
  "User not found": "Пользователь не найден",
  "Username already taken": "Логин уже занят",
  "Schedule not found": "Расписание не найдено",
  "Class with same position already exists":
    "Пара с таким чередованием уже установлена",
  "Single class already set": "Общая пара уже установлена",
  "Cannot set several single classes": "Нельзя установить несколько общих пар",
  "Cannot set same classes positions":
    "Нельзя установить несколько пар с одинаковым чередованием",
  "Classes already set": "Пары уже установлены",
  "Can set only even(odd) or single class at a time":
    "Нельзя установить общую пару и пару с чередованием",
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

export const translateErrorWithFallback = (error: any, fallback?: string) => {
  const err = getApiError(error);
  if (!err?.error) return;

  if (errors[err.error]) return errors[err.error];
  return fallback || unknownError;
};
