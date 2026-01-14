"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import BaseInput from "../input/BaseInput";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BaseTableColumn<T> {
  key: keyof T | string;
  label: string;
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
  // Cho phép key là key của T hoặc string khác (ví dụ "action")
  key: keyof T | "action";
  render?: (item: T) => React.ReactNode;
}

export default function BaseTable<T>({
  data,
  columns,
  caption,
  footer,
  showIndex = true,
  indexLabel = "Id",
  textBtn = "Create new item",
  onBtnAction,
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
    <div className="p-7 w-full bg-(--color-background) shadow-xs rounded-[3px]">
      <div className="mb-7 w-full flex items-center justify-between">
        <div className="w-full max-w-md">
          <BaseInput placeholder="Search..." />
        </div>
        <button
          onClick={onBtnAction}
          className="px-5 py-1.5 bg-(--color-btn) rounded-sm text-(--color-text-btn) cursor-pointer"
        >
          {textBtn}
        </button>
      </div>
      <ScrollArea className="h-[70vh] w-full!">
        <Table className="w-full">
          {caption && <TableCaption>{caption}</TableCaption>}

          <TableHeader className="sticky top-0 bg-(--color-foreground) z-10">
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
                    className="text-(--color-text) pr-5"
                    align={
                      displayColumns.length - 1 === index ? "right" : "char"
                    }
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
      </ScrollArea>
    </div>
  );
}
