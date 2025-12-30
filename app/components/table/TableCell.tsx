"use client";

import { ReactNode } from "react";

interface TableCellProps {
    children: ReactNode;
    width?: number;
    isHoverable?: boolean;
    noPadding?: boolean;
    colSpan?: number;
}

export default function TableCell({ children, width, noPadding = false, isHoverable, colSpan }: TableCellProps) {
    const hoverClass = isHoverable ? "hover:bg-[#4b4b4b]/60 hover:rounded-md transition-colors duration-150 cursor-pointer" : "";
    const paddingClass = noPadding ? "p-0" : "px-2 py-0";

    return (
        <td
            className={`${paddingClass} text-sm tracking-wider ${hoverClass}`}
            style={{ width: width ? `${width}px` : "auto" }}
            colSpan={colSpan}
        >
            {children}
        </td>
    );
}