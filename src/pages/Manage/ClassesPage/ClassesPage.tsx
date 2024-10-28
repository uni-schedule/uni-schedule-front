import React, { useEffect, useRef, useState } from "react";
import Style from "./ClassesPage.module.css";
import { FaPlus } from "react-icons/fa6";
import Table from "../../../components/UI/Table/Table.tsx";
import BaseButton from "../../../components/UI/Buttons/BaseButton/BaseButton.tsx";
import api from "../../../api/index.ts";
import {
  DomainClass,
  DomainClassType,
  DomainClassView,
  DomainUpdateClassDTO,
} from "../../../api/client/index.ts";
import { TableHeaderItem } from "../../../components/UI/Table/TableHeader.tsx";
import Paginator from "../../../components/UI/Paginator/Paginator.tsx";
import { useSchedule } from "../../../stores/scheduleStore.tsx";
import { useCreateClass } from "../../../hooks/classes/useCreateClass.ts";
import { useDeleteClass } from "../../../hooks/classes/useDeleteClass.ts";
import { useUpdateClass } from "../../../hooks/classes/useUpdateClass.ts";
import { useGetClasses } from "../../../hooks/classes/useGetClasses.ts";
import ClassesTableView from "../../../components/Tables/Classes/ClassesTableView.tsx";
import ClassModal, {
  ClassModalMethods,
} from "../../../components/Modals/Classes/ClassesModal/ClassesModal.tsx";

const ClassesPage: React.FC = () => {
  const { currentSchedule } = useSchedule();
  const { mutate, isLoading: isCreateLoading, isSuccess } = useCreateClass();
  const { mutate: deleteClass } = useDeleteClass();
  const {
    mutate: updateClass,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
  } = useUpdateClass();
  const { data, isLoading, setPage, pages, page } = useGetClasses(
    currentSchedule?.id!,
    20,
  );
  const classModalRef = useRef<ClassModalMethods[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [editClass, setEditClass] = useState<DomainUpdateClassDTO | null>(null);

  const initialValues: DomainUpdateClassDTO = {
    class_type: DomainClassType.Lecture,
    subject_id: 0,
    teacher_id: 0,
  };

  const onSubmitCreate = (data) => {
    if (isLoading) return;
    mutate({ ...data, schedule_id: currentSchedule?.id! });
  };
  const onSubmitUpdate = (data: DomainUpdateClassDTO) => {
    if (isUpdateLoading) return;
    updateClass({
      data: data,
      id: editClass!.id,
    });
  };
  const onCloseModal = () => {
    setIsOpen(false);
    setEditClass(null);
    classModalRef.current.forEach((ref) => ref?.reset());
  };

  useEffect(() => {
    if (!isSuccess && !isUpdateSuccess) return;
    onCloseModal();
  }, [isSuccess, isUpdateSuccess]);

  return (
    <>
      <ClassModal
        initialValues={initialValues}
        updateValues={editClass!}
        isOpen={isOpen}
        onClose={onCloseModal}
        onSubmit={onSubmitUpdate}
        isLoading={isUpdateLoading}
        formRef={(ref) => (classModalRef.current[0] = ref)}
        isUpdate
      />

      <div className={Style.buttons}>
        <BaseButton icon={<FaPlus />} onClick={() => setIsOpen(true)}>
          Добавить пару
        </BaseButton>
      </div>
      <ClassesTableView
        items={data?.data}
        isLoading={isLoading}
        pages={pages}
        page={page}
        onPageChange={(p) => setPage(p)}
        onDelete={(data: DomainClassView) => deleteClass(data.id)}
        onEdit={(data: DomainClassView) => {
          setEditClass({
            class_type: data.class_type,
            subject_id: data.subject.id,
            teacher_id: data.teacher.id,
          });
        }}
      />
    </>
  );
};

export default ClassesPage;
