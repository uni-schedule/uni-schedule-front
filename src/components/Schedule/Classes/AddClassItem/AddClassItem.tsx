import { FC } from "react";
import styles from "./AddClassItem.module.css";

interface AddClassItemProps {
  number: number;
}

export const AddClassItem: FC<AddClassItemProps> = ({ name, children }) => {
  return (
    <div className={styles.addClassItem}>
      <div className={styles.numberWrapper}>
        <p className={styles.numberWrapper}></p>
      </div>
    </div>
  );
};

export default AddClassItem;
