import Modal from "../../../UI/Modals/Modal/Modal";
import styles from "./ClassesModal.module.css";
import {
  maxMsg,
  minMsg,
  requiredMsg,
} from "../../../../helpers/validatorMessages";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../../../UI/Inputs/TextInput/TextInput";
import BaseButton from "../../../UI/Buttons/BaseButton/BaseButton";
import { useImperativeHandle } from "react";
import {
  DomainCreateClassDTO,
  DomainUpdateClassDTO,
} from "../../../../api/client";
import Select from "../../../UI/Inputs/Select/Select";
import { useGetTeachers } from "../../../../hooks/teachers/useGetTeachers";
import { useGetSubjects } from "../../../../hooks/subjects/useGetSubjects";
import { useSchedule } from "../../../../stores/scheduleStore";

export type ClassModalMethods = {
  reset: () => void;
} | null;

interface ClassModalProps {
  initialValues: DomainUpdateClassDTO;
  updateValues?: DomainUpdateClassDTO;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DomainUpdateClassDTO) => void;
  isLoading?: boolean;
  formRef?: React.Ref<ClassModalMethods>;
  isUpdate?: boolean;
}

const ClassModal = ({
  initialValues,
  updateValues,
  isOpen,
  onSubmit,
  onClose,
  isLoading,
  formRef,
  isUpdate,
}: ClassModalProps) => {
  const { currentSchedule } = useSchedule();
  const { data: teachers } = useGetTeachers(currentSchedule!.id, 100);
  const { data: subjects } = useGetSubjects(currentSchedule!.id, 100);

  const schema = yup.object<DomainUpdateClassDTO>().shape({
    class_type: yup.string().required(requiredMsg),
    subject_id: yup.number().required(requiredMsg),
    teacher_id: yup.number().required(requiredMsg),
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<DomainUpdateClassDTO>({
    defaultValues: initialValues,
    values: isUpdate ? updateValues : undefined,
    resolver: yupResolver<DomainUpdateClassDTO>(schema),
  });
  useImperativeHandle(formRef, () => ({
    reset,
  }));

  return (
    <Modal
      isOpen={isOpen}
      className={styles.modal}
      onClose={onClose}
      title={isUpdate ? "Редактирование пары" : "Добавление пары"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        {/* <Controller
          name="teacher_id"
          control={control}
          render={({ field }) => (
            <Select
              label="Преподаватель"
              onChange={field.onChange}
              selected={field.value}
              valueKey="id"
              labelKey="name"
              items={
                teachers?.data!.map((item) => ({
                  id: item.id,
                  name: `${item.last_name} ${item.first_name.charAt(0)}. ${item.surname.charAt(0)}.`,
                })) || []
              }
            />
          )}
        /> */}
        <BaseButton type="submit" isLoading={isLoading}>
          {isUpdate ? "Изменить" : "Добавить"}
        </BaseButton>
      </form>
    </Modal>
  );
};

export default ClassModal;
