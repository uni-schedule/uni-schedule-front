import { FC } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { DomainClassView } from "../../../../api/client";
import { classType } from "../../../../config/classType";
import styles from "./ClassItem.module.css";

interface ClassItemProps {
  classItem: DomainClassView;
  isEven: boolean | null;
  onUpdate?: (updateClass: DomainClassView) => void;
}

export const ClassItem: FC<ClassItemProps> = ({
  classItem,
  isEven,
  onUpdate,
}) => {
  const handleUpdate = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!classItem) return;
    return onUpdate && onUpdate(classItem);
  };

  return (
    <div className={styles.pairData}>
      <div
        className={[
          styles.positionLabel,
          isEven === true && styles.positionLabelEven,
          isEven === false && styles.positionLabelOdd,
          isEven === null && styles.positionLabelSingle,
        ].join(" ")}
      >
        {isEven === null && "Общая"}
        {isEven === true && "Числитель"}
        {isEven === false && "Знаменатель"}
      </div>
      <div className={styles.subjectTitleWrapper}>
        <button className={styles.editButton} onClick={handleUpdate}>
          <span className={styles.subjectTitle}>{classItem.subject.name}</span>
          <FaPenToSquare className={styles.editIcon} />
        </button>
      </div>
      <div className={styles.tagsWrapper}>
        <div className={styles.tag}>
          {classItem.teacher.last_name} {classItem.teacher.first_name[0]}.{" "}
          {classItem.teacher.surname[0]}.
        </div>
        <div className={styles.tag}>{classType[classItem.class_type]}</div>
      </div>
    </div>
  );
};

export default ClassItem;
