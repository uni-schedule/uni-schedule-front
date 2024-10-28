import { TableHeaderItem } from "./TableHeader";

interface TableHeaderProps<K> {
  headers: TableHeaderItem[];
  item: K;
}

function TableRow<K>({ headers, item }: TableHeaderProps<K>) {
  return (
    <tr>
      {headers.map((header, cellIndex) => (
        <td
          key={cellIndex}
          style={{
            width: header.width || "auto",
            textAlign: header.align || "left",
          }}
        >
          {header.render ? header.render(item) : item[header.key]}
        </td>
      ))}
    </tr>
  );
}

export default TableRow;
