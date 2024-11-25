import { FC } from "react";
import styles from "./WeekContainer.module.css";

interface WeekContainerProps {
  children?: React.ReactNode;
}

export const WeekContainer: FC<WeekContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default WeekContainer;
