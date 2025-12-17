"use client";

import { ReactNode } from "react";

interface TableCellProps {
    children: ReactNode;
    width?: number;
}

export default function TableCell({ children, width }: TableCellProps) {
    return (
        <td
            className="px-4 py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition cursor-pointer"
            style={{ width: width && width !== 150 ? `${width}px` : "auto" }}
        >
            {children}
        </td>
    );
}
