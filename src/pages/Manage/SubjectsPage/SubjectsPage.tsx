import React, { useEffect, useRef, useState } from "react";
import Style from "./SubjectsPage.module.css";
import { FaPlus } from "react-icons/fa6";
import BaseButton from "../../../components/UI/Buttons/BaseButton/BaseButton.tsx";
import { useGetSubjects } from "../../../hooks/subjects/useGetSubjects.ts";
import { useSchedule } from "../../../stores/scheduleStore.tsx";
import SubjectModal, {
  SubjectModalMethods,
} from "../../../components/Modals/Subjects/SubjectModal/SubjectModal.tsx";
import SubjectsTableView from "../../../components/Tables/Subjects/SubjectsTableView.tsx";
import {
  DomainSubject,
  DomainUpdateSubjectDTO,
} from "../../../api/client/api.ts";
import { useDeleteSubject } from "../../../hooks/subjects/useDeleteSubject.ts";
import { useCreateSubject } from "../../../hooks/subjects/useCreateSubject.ts";
import { useUpdateSubject } from "../../../hooks/subjects/useUpdateSubject.ts";

const SubjectsPage: React.FC = () => {
  const { currentSchedule } = useSchedule();
  const { mutate, isLoading: isCreateLoading, isSuccess } = useCreateSubject();
  const { mutate: deleteSubject } = useDeleteSubject();
  const {
    mutate: updateSubject,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
  } = useUpdateSubject();
  const { data, isLoading, setPage, pages, page } = useGetSubjects(
    currentSchedule?.id!,
    20,
  );
  const subjectModalRef = useRef<SubjectModalMethods[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editSubject, setEditSubject] = useState<DomainSubject | null>(null);

  const initialValues = {
    name: "",
  };

  const onSubmitCreate = (data) => {
    if (isLoading) return;
    mutate({ ...data, schedule_id: currentSchedule?.id! });
  };
  const onSubmitUpdate = (data: DomainUpdateSubjectDTO) => {
    if (isUpdateLoading) return;
    updateSubject({
      data: data,
      id: editSubject!.id,
    });
  };
  const onCloseModal = () => {
    setIsOpen(false);
    setEditSubject(null);
    subjectModalRef.current?.forEach((ref) => ref?.reset());
  };

  useEffect(() => {
    if (!isSuccess && !isUpdateSuccess) return;
    onCloseModal();
  }, [isSuccess, isUpdateSuccess]);
  return (
    <>
      <SubjectModal
        initialValues={initialValues}
        formRef={(ref) => (subjectModalRef.current[0] = ref)}
        isOpen={isOpen}
        onClose={onCloseModal}
        onSubmit={onSubmitCreate}
        isLoading={isCreateLoading}
      />
      <SubjectModal
        initialValues={initialValues}
        formRef={(ref) => (subjectModalRef.current[1] = ref)}
        isOpen={!!editSubject}
        onClose={onCloseModal}
        onSubmit={onSubmitUpdate}
        isLoading={isUpdateLoading}
        updateValues={editSubject!}
        isUpdate
      />

      <div className={Style.buttons}>
        <BaseButton icon={<FaPlus />} onClick={() => setIsOpen(true)}>
          Добавить предмет
        </BaseButton>
      </div>
      <SubjectsTableView
        items={data?.data}
        isLoading={isLoading}
        pages={pages}
        page={page}
        onPageChange={(p) => setPage(p)}
        onDelete={(data: DomainSubject) => deleteSubject(data.id)}
        onEdit={(data: DomainSubject) => {
          setEditSubject(data);
        }}
      />
    </>
  );
};

export default SubjectsPage;
