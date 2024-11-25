import { FC } from "react";
import styles from "./WeekItem.module.css";

interface WeekItemProps {
  name: string;
  children?: React.ReactNode;
}

export const WeekItem: FC<WeekItemProps> = ({ name, children }) => {
  return (
    <div className={styles.item}>
      <p className={styles.title}>{name}</p>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default WeekItem;
