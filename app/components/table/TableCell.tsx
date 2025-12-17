"use client";

import { ReactNode } from "react";

interface TableCellProps {
    children: ReactNode;
    width?: number;
    columnId?: string;
}

const HOVERABLE_COLUMNS = ["player", "nationality", "team", "position"];

export default function TableCell({ children, width, columnId }: TableCellProps) {
    const isHoverable = columnId && HOVERABLE_COLUMNS.includes(columnId);
    // Add rounded corners on hover and smooth color transition
    const hoverClass = isHoverable ? "hover:bg-[#4b4b4b]/60 hover:rounded-md transition-colors duration-150 cursor-pointer" : "";

    return (
        <td
            className={`px-4 py-3 text-sm tracking-wider ${hoverClass}`}
            style={{ width: width && width !== 150 ? `${width}px` : "auto" }}
        >
            {children}
        </td>
    );
}
