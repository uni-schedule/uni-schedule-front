import Paginator from "../../UI/Paginator/Paginator";
import Table from "../../UI/Table/Table";
import { TableHeaderItem } from "../../UI/Table/TableHeader";
import TableActions from "../../widgets/Table/TableActions";
import styles from "./BaseTableView.module.css";

export interface BaseTableViewProps<T> {
  headers: TableHeaderItem[];
  items?: T[];
  isLoading?: boolean;
  pages?: number;
  page?: number;
  onPageChange?: (page: number) => void;

  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

function BaseTableView<T>({
  headers,
  items = [],
  isLoading,
  pages,
  page,
  onPageChange,
  onEdit,
  onDelete,
}: BaseTableViewProps<T>) {
  let tableHeaders = headers;

  if (onEdit || onDelete) {
    tableHeaders = [
      ...headers,
      {
        title: "Действия",
        width: "50px",
        align: "center",
        key: "actions",
        render: (item: T) => (
          <TableActions
            data={item}
            onEdit={onEdit ? () => onEdit(item) : undefined}
            onDelete={onDelete ? () => onDelete(item) : undefined}
          />
        ),
      },
    ];
  }

  return (
    <>
      <Table headers={tableHeaders} items={items} isLoading={isLoading} />
      {items?.length > 0 && pages && page && onPageChange ? (
        <div className={styles.paginator}>
          <Paginator
            totalPages={pages}
            currentPage={page}
            onPageChange={(p) => onPageChange(p)}
          />
        </div>
      ) : null}
    </>
  );
}

export default BaseTableView;
