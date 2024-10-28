import Loader from "../Loader/Loader";
import styles from "./Table.module.css";
import TableHeader, { TableHeaderItem } from "./TableHeader";
import TableRow from "./TableRow";

interface TableProps<T> {
  headers: TableHeaderItem[];
  items?: T[];
  isLoading?: boolean;
}

function Table<T>({ headers, items = [], isLoading }: TableProps<T>) {
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.scrollableContainer}>
        <table className={styles.table}>
          <TableHeader headers={headers} />
          <tbody>
            {isLoading ? (
              <tr className={styles.noData}>
                <td colSpan={headers.length} className={styles.noData}>
                  <Loader color="black" />
                </td>
              </tr>
            ) : items?.length > 0 ? (
              items.map((item, rowIndex) => (
                <TableRow key={rowIndex} headers={headers} item={item} />
              ))
            ) : (
              <tr className={styles.noData}>
                <td colSpan={headers.length} className={styles.noData}>
                  Нет записей
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
