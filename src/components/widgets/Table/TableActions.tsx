import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import styles from "./TableActions.module.css";

interface TableActionsProps<T> {
  data: T;
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
}

function TableActions<T>({ data, onEdit, onDelete }: TableActionsProps<T>) {
  return (
    <div className={styles.tableActions}>
      {onEdit ? (
        <button className={styles.button} onClick={() => onEdit(data)}>
          <FaPenToSquare className={styles.icon} />
        </button>
      ) : null}
      {onDelete ? (
        <button className={styles.button} onClick={() => onDelete(data)}>
          <FaTrash className={styles.icon} />
        </button>
      ) : null}
    </div>
  );
}

export default TableActions;
