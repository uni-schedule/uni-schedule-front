import { FC } from "react";
import { FaPlus } from "react-icons/fa6";
import { DomainClassView } from "../../../../api/client";
import { PAIR_TIME } from "../../../../config/time";
import ClassItem from "../ClassItem/ClassItem";
import styles from "./EntryItem.module.css";

interface EntryItemProps {
  number: number;
  even?: DomainClassView;
  odd?: DomainClassView;
  isEvenWeek?: boolean | null;
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
  isEvenWeek,
}) => {
  return (
    <div
      className={[
        styles.classItem,
        !odd && !even && styles.classItemEmpty,
      ].join(" ")}
    >
      <div className={[styles.numberWrapper].join(" ")}>
        <p className={styles.number}>{number}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.timeWrapper}>
          <p>{PAIR_TIME[number].start + " - " + PAIR_TIME[number].end}</p>
        </div>
        <div className={styles.pairs}>
          {!isAlternate && even && (
            <ClassItem
              classItem={even}
              isEven={null}
              onUpdate={onUpdate}
              isEvenWeek={isEvenWeek}
            />
          )}
          {isAlternate && even && (
            <ClassItem
              classItem={even}
              isEven={true}
              onUpdate={onUpdate}
              isEvenWeek={isEvenWeek}
            />
          )}
          {isAlternate && odd && (
            <ClassItem
              classItem={odd}
              isEven={false}
              onUpdate={onUpdate}
              isEvenWeek={isEvenWeek}
            />
          )}
          {(!odd || !even) && onCreate && (
            <button
              onClick={() => onCreate && onCreate(number, null)}
              className={styles.pairAdd}
            >
              <FaPlus className={styles.addIcon} /> Добавить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntryItem;
