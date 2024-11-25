import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  DomainClassType,
  DomainSubjectView,
  DomainTeacherView,
} from "../../../../api/client";
import { requiredMsg } from "../../../../helpers/validatorMessages";
import BaseButton from "../../../UI/Buttons/BaseButton/BaseButton";
import Select from "../../../UI/Inputs/Select/Select";
import Modal from "../../../UI/Modals/Modal/Modal";
import styles from "./EntryModal.module.css";
import { EntryModalValues } from "./EntryModal.types";

export type EntryModalMethods = {
  reset: () => void;
} | null;

interface EntryModalProps {
  initialValues?: EntryModalValues;
  isOpen: boolean;
  isLoading?: boolean;
  formRef?: React.Ref<EntryModalMethods>;
  isUpdate?: boolean;
  teachers: DomainTeacherView[];
  subjects: DomainSubjectView[];
  onClose: () => void;
  onSubmit: (data: EntryModalValues) => void;
  onDelete?: () => void;
}

const classTypes: { id: DomainClassType; name: string }[] = [
  { id: DomainClassType.ClassTypeLecture, name: "Лекция" },
  { id: DomainClassType.ClassTypePractice, name: "Практика" },
  { id: DomainClassType.ClassTypeLab, name: "Лабораторная" },
  { id: DomainClassType.ClassTypeCombined, name: "Совмещенная" },
];

const evenWeekTypes: { id: boolean; name: string }[] = [
  { id: true, name: "По числителю" },
  { id: false, name: "По знаменателю" },
];

const EntryModal = ({
  initialValues,
  isOpen,
  onSubmit,
  onClose,
  isLoading,
  formRef,
  isUpdate,
  teachers,
  subjects,
  onDelete,
}: EntryModalProps) => {
  const schema = yup.object().shape({
    class_type: yup.mixed<DomainClassType>().required(requiredMsg),
    subject_id: yup.number().required(requiredMsg),
    teacher_id: yup.number().required(requiredMsg),
  });

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onDelete && onDelete();
  };

  const { handleSubmit, control, reset } = useForm<EntryModalValues>({
    defaultValues: initialValues,
    resolver: yupResolver(schema) as any,
  });
  useImperativeHandle(formRef, () => ({
    reset,
  }));

  useEffect(() => {
    console.log("initialValues", initialValues);
    reset(initialValues);
  }, [initialValues]);

  return (
    <Modal
      isOpen={isOpen}
      className={styles.modal}
      onClose={onClose}
      title={isUpdate ? "Редактирование пары" : "Добавление пары"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <Controller
          control={control}
          name="teacher_id"
          render={({ field: { onChange, value } }) => (
            <Select
              items={teachers}
              labelKey={(item) =>
                `${item.last_name} ${item.first_name[0]}. ${item.surname[0]}.`
              }
              label="Преподаватель"
              valueKey="id"
              selected={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="subject_id"
          render={({ field: { onChange, value } }) => (
            <Select
              items={subjects}
              labelKey="name"
              label="Предмет"
              valueKey="id"
              selected={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="class_type"
          render={({ field: { onChange, value } }) => (
            <Select
              items={classTypes}
              labelKey="name"
              label="Тип пары"
              valueKey="id"
              selected={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="even_week"
          render={({ field: { onChange, value } }) => (
            <Select
              showNullOption={true}
              items={evenWeekTypes}
              labelKey="name"
              label="Четность недели"
              nullLabel="Общая"
              valueKey="id"
              selected={value}
              onChange={onChange}
            />
          )}
        />
        <div className={styles.buttonWrapper}>
          <BaseButton
            type="submit"
            isLoading={isLoading}
            className={styles.button}
          >
            {isUpdate ? "Изменить" : "Добавить"}
          </BaseButton>
          {isUpdate && (
            <BaseButton
              type="button"
              isLoading={isLoading}
              className={styles.button}
              onClick={handleDelete}
            >
              Удалить
            </BaseButton>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default EntryModal;
