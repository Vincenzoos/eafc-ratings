"use client";

import { ReactNode } from "react";

interface TableHeaderCellProps {
    children: ReactNode;
    width?: number;
    align?: "left" | "center" | "right";
}

export default function TableHeaderCell({
    children,
    width,
    align = "left",
}: TableHeaderCellProps) {
    const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";

    return (
        <th
            className={`px-2 py-3 ${alignClass} text-green-400 font-bold text-xs`}
            style={{ width: width ? `${width}px` : "auto" }}
        >
            {children}
        </th>
    );
}
