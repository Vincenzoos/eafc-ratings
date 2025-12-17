"use client";

import { ReactNode } from "react";

interface TableHeadProps {
    children: ReactNode;
}

export default function TableHead({ children }: TableHeadProps) {
    return <thead>{children}</thead>;
}
