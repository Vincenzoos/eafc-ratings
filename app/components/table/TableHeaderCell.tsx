"use client";

import { ReactNode } from "react";

interface TableHeaderCellProps {
    children: ReactNode;
    width?: number;
}

export default function TableHeaderCell({
    children,
    width,
}: TableHeaderCellProps) {
    return (
        <th
            className="px-4 py-3 text-left text-green-400 font-bold text-xs uppercase tracking-wider hover:bg-gray-800 transition cursor-pointer"
            style={{ width: width && width !== 150 ? `${width}px` : "auto" }}
        >
            {children}
        </th>
    );
}
