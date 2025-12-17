"use client";

import { ReactNode } from "react";

interface TableContainerProps {
    children: ReactNode;
}

export default function TableContainer({ children }: TableContainerProps) {
    return (
        <div className="w-full overflow-x-auto bg-black">
            {/* Use border-separate and Tailwind arbitrary property to add vertical gap between header and body */}
            <table className="w-full border-separate [border-spacing:0_0.5rem]">
                {children}
            </table>
        </div>
    );
}
