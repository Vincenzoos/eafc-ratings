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
            className={`border-b border-gray-800 hover:bg-gray-900 transition ${isAlternate ? "bg-black" : "bg-gray-950"
                }`}
        >
            {children}
        </tr>
    );
}
