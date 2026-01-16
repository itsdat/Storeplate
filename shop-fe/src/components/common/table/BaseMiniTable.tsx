import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { ReactNode } from "react";

interface BaseTableColumn<T> {
  key: keyof T | string;
  label: string | ReactNode;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
  hidden?: boolean; // 👈 thêm optional cho phép ẩn riêng cột
}

interface BaseTableProps<T> {
  data: T[];
  columns: BaseTableColumn<T>[];
  caption?: string;
  footer?: React.ReactNode;
  showIndex?: boolean; // 👈 props bật/tắt cột Id mặc định
  indexLabel?: string; // 👈 tùy chỉnh tiêu đề cột Id
  textBtn?: string;
  onBtnAction?: () => void;
}

export interface AdvancedColumn<T> {
  label: string;
  key: keyof T | "action";
  render?: (item: T) => React.ReactNode;
}

export default function BaseMiniTable<T>({
  data,
  columns,
  showIndex = true,
  indexLabel = "Id",
}: BaseTableProps<T>) {
  // Thêm cột Index nếu được bật
  const displayColumns = React.useMemo(() => {
    const visibleColumns = columns.filter((c) => !c.hidden); // loại bỏ các cột bị ẩn
    if (showIndex) {
      return [
        {
          key: "__index__",
          label: indexLabel,
          render: (_: T, index: number) => (
            <span className="font-medium text-(--color-title)">
              #{index + 1}
            </span>
          ),
          className: "w-[80px]",
        },
        ...visibleColumns,
      ];
    }
    return visibleColumns;
  }, [columns, showIndex, indexLabel]);

  return (
    <div className="relative">
      <Table>
        <TableHeader className="sticky top-0 bg-(--color-background) z-10">
          <TableRow className="border-(--color-border)">
            {displayColumns.map((col, index) => (
              <TableHead
                key={String(col.key)}
                className={`${col.className ?? ""} text-(--color-title) ${
                  displayColumns.length - 1 === index ? "text-right" : ""
                }`}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow
              key={rowIndex}
              className="hover:bg-(--color-hover) border-(--color-border)"
            >
              {displayColumns.map((col, index) => (
                <TableCell
                  key={String(col.key)}
                  className="text-(--color-text)"
                  align={displayColumns.length - 1 === index ? "right" : "char"}
                >
                  {col.render
                    ? col.render(item, rowIndex)
                    : (item as any)[col.key] ?? ""}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
