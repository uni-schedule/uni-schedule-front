import { FC } from "react";
import { FaPlus } from "react-icons/fa6";
import { DomainClassView } from "../../../../api/client";
import ClassItem from "../ClassItem/ClassItem";
import styles from "./EntryItem.module.css";

interface EntryItemProps {
  number: number;
  even?: DomainClassView;
  odd?: DomainClassView;
  isAlternate: boolean;
  onCreate?: (number: number, isEven: boolean | null) => void;
  onUpdate?: (updateClass: DomainClassView) => void;
}

export const EntryItem: FC<EntryItemProps> = ({
  number,
  even,
  odd,
  isAlternate,
  onCreate,
  onUpdate,
}) => {
  return (
    <div
      className={[
        styles.classItem,
        !odd && !even && styles.classItemEmpty,
      ].join(" ")}
    >
      <div className={styles.numberWrapper}>
        <p className={styles.number}>{number}</p>
      </div>
      <div className={styles.content}>
        {!isAlternate && even && (
          <ClassItem classItem={even} isEven={null} onUpdate={onUpdate} />
        )}
        {isAlternate && even && (
          <ClassItem classItem={even} isEven={true} onUpdate={onUpdate} />
        )}
        {isAlternate && odd && (
          <ClassItem classItem={odd} isEven={false} onUpdate={onUpdate} />
        )}

        <button
          onClick={() => onCreate && onCreate(number, null)}
          className={styles.pairAdd}
        >
          <FaPlus className={styles.addIcon} /> Добавить
        </button>
      </div>
    </div>
  );
};

export default EntryItem;
