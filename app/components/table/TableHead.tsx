"use client";

import { ReactNode } from "react";

interface TableHeadProps {
    children: ReactNode;
}

export default function TableHead({ children }: TableHeadProps) {
    // use after pseudo-element to create spacing below the header
    return <thead className="[&_tr]:border-t-2 [&_tr]:border-b-2 [&_tr]:border-[#4b4b4b] after:content-[''] after:block after:h-6">{children}</thead>;
}