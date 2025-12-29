"use client";

import { ReactNode } from "react";

interface TableContainerProps {
    children: ReactNode;
}

export default function TableContainer({ children }: TableContainerProps) {
    return (
        <div className="w-full overflow-x-auto bg-black">
            {/* border-collapse to remove gaps between cells */}
            <table className="w-full border-collapse">
                {children}
            </table>
        </div>
    );
}
