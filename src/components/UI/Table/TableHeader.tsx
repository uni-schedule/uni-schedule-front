import React from "react";

interface TableHeaderProps {
  headers: TableHeaderItem[];
}

export interface TableHeaderItem {
  title: string;
  key?: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (item: any) => React.ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            style={{
              width: header.width || "auto",
              textAlign: header.align || "left",
            }}
          >
            {header.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
