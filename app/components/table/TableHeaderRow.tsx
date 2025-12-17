"use client";

import { ReactNode } from "react";

interface TableHeaderRowProps {
    children: ReactNode;
}

export default function TableHeaderRow({ children }: TableHeaderRowProps) {
    return (
        <tr className="border-t-2 border-b-2 border-[#4b4b4b] bg-[#212222]">
            {children}
        </tr>
    );
}
