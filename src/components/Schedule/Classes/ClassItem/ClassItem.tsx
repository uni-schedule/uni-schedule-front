import { FC } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { DomainClassView } from "../../../../api/client";
import { classType } from "../../../../config/classType";
import styles from "./ClassItem.module.css";

interface ClassItemProps {
  classItem: DomainClassView;
  isEvenWeek?: boolean | null;
  isEven: boolean | null;
  onUpdate?: (updateClass: DomainClassView) => void;
}

export const ClassItem: FC<ClassItemProps> = ({
  classItem,
  isEven,
  onUpdate,
  isEvenWeek,
}) => {
  const handleUpdate = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!classItem) return;
    return onUpdate && onUpdate(classItem);
  };

  return (
    <div className={styles.pairData}>
      {!(isEvenWeek !== null && isEven === null) && (
        <div
          className={[
            styles.positionLabel,
            isEven === true && styles.positionLabelEven,
            isEven === false && styles.positionLabelOdd,
            isEven === null && styles.positionLabelSingle,
            isEvenWeek !== null &&
              isEvenWeek === isEven &&
              styles.positionLabelEvenWeek,
          ].join(" ")}
        >
          {isEven === null && "Общая"}
          {isEven === true && "Числитель"}
          {isEven === false && "Знаменатель"}
        </div>
      )}

      <div className={styles.subjectTitleWrapper}>
        {onUpdate ? (
          <button className={styles.editButton} onClick={handleUpdate}>
            <span className={styles.subjectTitle}>
              {classItem.subject.name}
            </span>
            <FaPenToSquare className={styles.editIcon} />
          </button>
        ) : (
          <span className={styles.subjectTitle}>{classItem.subject.name}</span>
        )}
      </div>
      <div className={styles.tagsWrapper}>
        <div className={styles.tag}>
          {classItem.teacher.last_name} {classItem.teacher.first_name[0]}.{" "}
          {classItem.teacher.surname[0]}.
        </div>
        <div className={[styles.tag].join(" ")}>
          {classType[classItem.class_type]}
        </div>
      </div>
    </div>
  );
};

export default ClassItem;
