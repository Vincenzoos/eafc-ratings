"use client";

import { ReactNode } from "react";

interface TableRowProps {
    children: ReactNode;
    isAlternate?: boolean;
}

export default function TableRow({
    children,
    isAlternate = false,
}: TableRowProps) {
    return (
        <tr
            className={`border-none"
                }`}
        >
            {children}
        </tr>
    );
}
