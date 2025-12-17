"use client";

import { ReactNode } from "react";

interface TableContainerProps {
    children: ReactNode;
}

export default function TableContainer({ children }: TableContainerProps) {
    return (
        <div className="w-full overflow-x-auto bg-black rounded-lg">
            <table className="w-full border-collapse">
                {children}
            </table>
        </div>
    );
}
