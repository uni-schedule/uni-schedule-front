import Modal from "../../../UI/Modals/Modal/Modal";
import styles from "./ScheduleModal.module.css";
import {
  maxMsg,
  minMsg,
  requiredMsg,
} from "../../../../helpers/validatorMessages";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../../../UI/Inputs/TextInput/TextInput";
import BaseButton from "../../../UI/Buttons/BaseButton/BaseButton";
import { useImperativeHandle } from "react";
import { HandlerCreateScheduleRequest } from "../../../../api/client";

export type ScheduleModalMethods = {
  reset: () => void;
} | null;

interface ScheduleModalProps {
  initialValues: HandlerCreateScheduleRequest;
  updateValues?: HandlerCreateScheduleRequest;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: HandlerCreateScheduleRequest) => void;
  isLoading?: boolean;
  formRef?: React.Ref<ScheduleModalMethods>;
  isUpdate?: boolean;
}

const ScheduleModal = ({
  initialValues,
  updateValues,
  isOpen,
  onSubmit,
  onClose,
  isLoading,
  formRef,
  isUpdate,
}: ScheduleModalProps) => {
  const schema = yup.object<HandlerCreateScheduleRequest>().shape({
    title: yup
      .string()
      .min(4, minMsg(4))
      .max(50, maxMsg(50))
      .required(requiredMsg),
    slug: yup
      .string()
      .min(4, minMsg(4))
      .max(50, maxMsg(50))
      .matches(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Можно использовать только латинские буквы, цифры, и дефис",
      )
      .required(requiredMsg),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HandlerCreateScheduleRequest>({
    defaultValues: initialValues,
    values: isUpdate ? updateValues : undefined,
    resolver: yupResolver<HandlerCreateScheduleRequest>(schema),
  });
  useImperativeHandle(formRef, () => ({
    reset,
  }));

  return (
    <Modal
      isOpen={isOpen}
      className={styles.modal}
      onClose={onClose}
      title={isUpdate ? "Редактирование расписания" : "Добавление расписания"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <TextInput
          label="Название"
          {...register("title")}
          errorMessage={errors.title?.message}
        />
        <TextInput
          label="Имя ссылки (slug)"
          {...register("slug")}
          errorMessage={errors.slug?.message}
        />
        <BaseButton type="submit" isLoading={isLoading}>
          {isUpdate ? "Изменить" : "Добавить"}
        </BaseButton>
      </form>
    </Modal>
  );
};

export default ScheduleModal;
