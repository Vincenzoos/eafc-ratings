"use client";

import { ReactNode } from "react";

interface TableHeaderRowProps {
    children: ReactNode;
}

export default function TableHeaderRow({ children }: TableHeaderRowProps) {
    return (
        <tr className="border-b border-gray-700 bg-gray-900">
            {children}
        </tr>
    );
}
