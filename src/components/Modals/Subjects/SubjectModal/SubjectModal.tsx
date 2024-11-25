import { yupResolver } from "@hookform/resolvers/yup";
import { useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { DomainCreateSubjectDTO } from "../../../../api/client";
import {
  maxMsg,
  minMsg,
  requiredMsg,
} from "../../../../helpers/validatorMessages";
import BaseButton from "../../../UI/Buttons/BaseButton/BaseButton";
import TextInput from "../../../UI/Inputs/TextInput/TextInput";
import Modal from "../../../UI/Modals/Modal/Modal";
import styles from "./SubjectModal.module.css";

export type SubjectModalMethods = {
  reset: () => void;
} | null;

interface SubjectModalProps {
  initialValues: Omit<DomainCreateSubjectDTO, "schedule_id">;
  updateValues?: Omit<DomainCreateSubjectDTO, "schedule_id">;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<DomainCreateSubjectDTO, "schedule_id">) => void;
  isLoading?: boolean;
  formRef?: React.Ref<SubjectModalMethods>;
  isUpdate?: boolean;
}

const SubjectModal = ({
  initialValues,
  updateValues,
  isOpen,
  onSubmit,
  onClose,
  isLoading,
  formRef,
  isUpdate,
}: SubjectModalProps) => {
  const schema = yup
    .object<Omit<DomainCreateSubjectDTO, "schedule_id">>()
    .shape({
      name: yup
        .string()
        .min(4, minMsg(4))
        .max(100, maxMsg(100))
        .required(requiredMsg),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<DomainCreateSubjectDTO, "schedule_id">>({
    defaultValues: initialValues,
    values: isUpdate ? updateValues : undefined,
    resolver: yupResolver<Omit<DomainCreateSubjectDTO, "schedule_id">>(schema),
  });
  useImperativeHandle(formRef, () => ({
    reset,
  }));

  return (
    <Modal
      isOpen={isOpen}
      className={styles.modal}
      onClose={onClose}
      title={isUpdate ? "Редактирование предмета" : "Добавление предмета"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <TextInput
          label="Название"
          {...register("name")}
          errorMessage={errors.name?.message}
        />
        <BaseButton type="submit" isLoading={isLoading}>
          {isUpdate ? "Изменить" : "Добавить"}
        </BaseButton>
      </form>
    </Modal>
  );
};

export default SubjectModal;
