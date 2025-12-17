"use client";

import { ReactNode } from "react";

interface TableBodyProps {
    children: ReactNode;
}

export default function TableBody({ children }: TableBodyProps) {
    return <tbody>{children}</tbody>;
}
