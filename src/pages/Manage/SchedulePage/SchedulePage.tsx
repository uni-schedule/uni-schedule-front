import { useCallback, useEffect, useRef, useState } from "react";
import {
  DomainClass,
  DomainClassView,
  DomainDay,
} from "../../../api/client/api.ts";
import EntryModal, {
  EntryModalMethods,
} from "../../../components/Modals/Entries/EntryModal/EntryModal.tsx";
import { EntryModalValues } from "../../../components/Modals/Entries/EntryModal/EntryModal.types.ts";
import WeekContainer from "../../../components/Schedule/Weeks/WeekContainer/WeekContainer.tsx";
import WeekEditingList from "../../../components/Schedule/Weeks/WeekEditingList/WeekEditingList.tsx";
import { useCreateClass } from "../../../hooks/classes/useCreateClass.ts";
import { useDeleteClass } from "../../../hooks/classes/useDeleteClass.ts";
import { useUpdateClass } from "../../../hooks/classes/useUpdateClass.ts";
import { useGetScheduleView } from "../../../hooks/schedules/useGetScheduleView.ts";
import { useGetSubjects } from "../../../hooks/subjects/useGetSubjects.ts";
import { useGetTeachers } from "../../../hooks/teachers/useGetTeachers.ts";
import { useSchedule } from "../../../stores/scheduleStore.tsx";
import Nullable from "../../../types/utility/Nullable.ts";

const SchedulePage: React.FC = () => {
  const { currentSchedule } = useSchedule();
  const { data, refetch } = useGetScheduleView(currentSchedule?.slug!);

  const { data: teachers } = useGetTeachers(currentSchedule?.id!, 100);
  const { data: subjects } = useGetSubjects(currentSchedule?.id!, 100);

  const deleteClass = useDeleteClass();
  const createClass = useCreateClass();
  const updateClass = useUpdateClass();

  const [isOpen, setIsOpen] = useState(false);
  const editingClass = useRef<Nullable<DomainClass>>();
  const modalRef = useRef<EntryModalMethods>(null);

  const handleAddClass = useCallback(
    (day: DomainDay, number: number, isEven: boolean | null) => {
      editingClass.current = {
        id: null,
        schedule_id: currentSchedule?.id!,
        day_of_week: day,
        number: number,
        even_week: isEven,
        class_type: null,
        subject_id: null,
        teacher_id: null,
      };

      setIsOpen(true);
    },
    [data],
  );

  const handleUpdateClass = useCallback(
    (updateClass: DomainClassView) => {
      editingClass.current = {
        id: updateClass.id,
        schedule_id: currentSchedule?.id!,
        class_type: updateClass.class_type,
        day_of_week: updateClass.day_of_week,
        even_week: updateClass.even_week,
        number: updateClass.number,
        subject_id: updateClass.subject.id,
        teacher_id: updateClass.teacher.id,
      };
      setIsOpen(true);
    },
    [data],
  );

  const handleDeleteClass = () => {
    if (!editingClass.current?.id) return;

    deleteClass.mutate(editingClass.current?.id);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    editingClass.current = undefined;
  };

  const handleFormSubmit = (values: EntryModalValues) => {
    if (editingClass.current?.id) {
      updateClass.mutate({
        data: {
          even_week: values.even_week!,
          number: values.number!,
          day_of_week: values.day_of_week!,
          class_type: values.class_type!,
          subject_id: values.subject_id!,
          teacher_id: values.teacher_id!,
        },
        id: editingClass.current?.id,
      });
      return;
    }

    createClass.mutate({
      schedule_id: currentSchedule?.id!,
      even_week: values.even_week!,
      number: values.number!,
      day_of_week: values.day_of_week!,
      class_type: values.class_type!,
      subject_id: values.subject_id!,
      teacher_id: values.teacher_id!,
    });
  };

  useEffect(() => {
    if (
      !createClass.isSuccess &&
      !updateClass.isSuccess &&
      !deleteClass.isSuccess
    )
      return;
    refetch();
    handleCloseModal();
  }, [createClass.isSuccess, updateClass.isSuccess, deleteClass.isSuccess]);

  return (
    <>
      {teachers?.data && subjects?.data && (
        <EntryModal
          formRef={modalRef}
          teachers={teachers!.data.sort((a, b) =>
            a.last_name.localeCompare(b.last_name),
          )}
          subjects={subjects!.data.sort((a, b) => a.name.localeCompare(b.name))}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          isLoading={
            createClass.isLoading ||
            updateClass.isLoading ||
            deleteClass.isLoading
          }
          isOpen={isOpen}
          isUpdate={!!editingClass.current?.id}
          onDelete={handleDeleteClass}
          initialValues={editingClass.current}
        />
      )}
      <WeekContainer>
        <WeekEditingList
          classes={data?.entries}
          onAddClass={handleAddClass}
          onUpdateClass={handleUpdateClass}
        />
      </WeekContainer>
    </>
  );
};

export default SchedulePage;
