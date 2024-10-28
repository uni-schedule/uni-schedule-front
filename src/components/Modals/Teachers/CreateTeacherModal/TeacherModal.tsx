import Modal from "../../../UI/Modals/Modal/Modal";
import styles from "./TeahcerModal.module.css";
import {
  maxMsg,
  minMsg,
  requiredMsg,
} from "../../../../helpers/validatorMessages";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DomainTeacherUpdateDTO } from "../../../../api/client";
import TextInput from "../../../UI/Inputs/TextInput/TextInput";
import BaseButton from "../../../UI/Buttons/BaseButton/BaseButton";
import { useImperativeHandle } from "react";

export type TeacherModalMethods = {
  reset: () => void;
} | null;

interface TeacherModalProps {
  initialValues: Omit<DomainTeacherUpdateDTO, "schedule_id">;
  updateValues?: Omit<DomainTeacherUpdateDTO, "schedule_id">;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<DomainTeacherUpdateDTO, "schedule_id">) => void;
  isLoading?: boolean;
  formRef?: React.Ref<TeacherModalMethods>;
  isUpdate?: boolean;
}

const TeacherModal = ({
  initialValues,
  updateValues,
  isOpen,
  onSubmit,
  onClose,
  isLoading,
  formRef,
  isUpdate,
}: TeacherModalProps) => {
  const schema = yup
    .object<Omit<DomainTeacherUpdateDTO, "schedule_id">>()
    .shape({
      first_name: yup
        .string()
        .min(4, minMsg(4))
        .max(50, maxMsg(50))
        .required(requiredMsg),
      last_name: yup
        .string()
        .min(4, minMsg(4))
        .max(50, maxMsg(50))
        .required(requiredMsg),
      surname: yup
        .string()
        .min(4, minMsg(4))
        .max(50, maxMsg(50))
        .required(requiredMsg),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<DomainTeacherUpdateDTO, "schedule_id">>({
    defaultValues: initialValues,
    values: isUpdate ? updateValues : undefined,
    resolver: yupResolver<Omit<DomainTeacherUpdateDTO, "schedule_id">>(schema),
  });
  useImperativeHandle(formRef, () => ({
    reset,
  }));

  return (
    <Modal
      isOpen={isOpen}
      className={styles.modal}
      onClose={onClose}
      title={
        isUpdate ? "Редактирование преподавателя" : "Добавление преподавателя"
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <TextInput
          label="Имя"
          {...register("first_name")}
          errorMessage={errors.first_name?.message}
        />
        <TextInput
          label="Фамилия"
          {...register("last_name")}
          errorMessage={errors.last_name?.message}
        />
        <TextInput
          label="Отчество"
          {...register("surname")}
          errorMessage={errors.surname?.message}
        />
        <BaseButton type="submit" isLoading={isLoading}>
          {isUpdate ? "Изменить" : "Добавить"}
        </BaseButton>
      </form>
    </Modal>
  );
};

export default TeacherModal;
