import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  DomainTeacher,
  DomainTeacherUpdateDTO,
} from "../../../api/client/api.ts";
import TeacherModal, {
  TeacherModalMethods,
} from "../../../components/Modals/Teachers/CreateTeacherModal/TeacherModal.tsx";
import TeachersTableView from "../../../components/Tables/Teachers/TeachersTableView.tsx";
import BaseButton from "../../../components/UI/Buttons/BaseButton/BaseButton.tsx";
import { useCreateTeacher } from "../../../hooks/teachers/useCreateTeacher.ts";
import { useDeleteTeacher } from "../../../hooks/teachers/useDeleteTeacher.ts";
import { useGetTeachers } from "../../../hooks/teachers/useGetTeachers.ts";
import { useUpdateTeacher } from "../../../hooks/teachers/useUpdateTeacher.ts";
import { useSchedule } from "../../../stores/scheduleStore.tsx";
import Style from "./TeachersPage.module.css";

const TeachersPage: React.FC = () => {
  const { currentSchedule } = useSchedule();
  const { mutate, isLoading: isCreateLoading, isSuccess } = useCreateTeacher();
  const { mutate: deleteTeacher } = useDeleteTeacher();
  const {
    mutate: updateTeacher,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
  } = useUpdateTeacher();
  const { data, isLoading, setPage, pages, page } = useGetTeachers(
    currentSchedule?.id!,
    20,
  );
  const teacherModalRef = useRef<TeacherModalMethods[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [editTeacher, setEditTeacher] = useState<DomainTeacher | null>(null);

  const initialValues = {
    first_name: "",
    last_name: "",
    surname: "",
  };

  const onSubmitCreate = (
    data: Omit<DomainTeacherUpdateDTO, "schedule_id">,
  ) => {
    if (isLoading) return;

    data.first_name = data.first_name.trim();
    data.last_name = data.last_name.trim();
    data.surname = data.surname.trim();
    mutate({ ...data, schedule_id: currentSchedule?.id! });
  };
  const onSubmitUpdate = (data: DomainTeacherUpdateDTO) => {
    if (isUpdateLoading) return;
    data.first_name = data.first_name.trim();
    data.last_name = data.last_name.trim();
    data.surname = data.surname.trim();
    updateTeacher({
      data: data,
      id: editTeacher!.id,
    });
  };
  const onCloseModal = () => {
    setIsOpen(false);
    setEditTeacher(null);
    teacherModalRef.current.forEach((ref) => ref?.reset());
  };

  useEffect(() => {
    if (!isSuccess && !isUpdateSuccess) return;
    onCloseModal();
  }, [isSuccess, isUpdateSuccess]);

  return (
    <>
      <TeacherModal
        initialValues={initialValues}
        formRef={(ref) => (teacherModalRef.current[0] = ref)}
        isOpen={isOpen}
        onClose={onCloseModal}
        onSubmit={onSubmitCreate}
        isLoading={isCreateLoading}
      />
      <TeacherModal
        initialValues={initialValues}
        formRef={(ref) => (teacherModalRef.current[1] = ref)}
        isOpen={!!editTeacher}
        onClose={onCloseModal}
        onSubmit={onSubmitUpdate}
        isLoading={isUpdateLoading}
        updateValues={editTeacher!}
        isUpdate
      />

      <div className={Style.buttons}>
        <BaseButton icon={<FaPlus />} onClick={() => setIsOpen(true)}>
          Добавить преподавателя
        </BaseButton>
      </div>
      <TeachersTableView
        items={data?.data}
        isLoading={isLoading}
        pages={pages}
        page={page}
        onPageChange={(p) => setPage(p)}
        onDelete={(data: DomainTeacher) => deleteTeacher(data.id)}
        onEdit={(data: DomainTeacher) => {
          setEditTeacher(data);
        }}
      />
    </>
  );
};

export default TeachersPage;
