"use client"
import { Suspense, use } from "react";
import { Player } from "../types/player";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";

interface TanstackRankingTable {
    playersPromise: Promise<Player[]>
}
export default function TanstackRankingTable(
    { playersPromise }: TanstackRankingTable
) {
    // Use the 'use' hook to unwrap the promise and get the actual data
    const players = use(playersPromise);

    // Define data source
    const data = useMemo(() => players, []);

    // Define columns
    const columns = useMemo(() => [
        {
            // defines the key from the data object being passed in to the table.
            accessorKey: "rank",
            header: "Rank",
        },
        {
            // defines the key from the data object being passed in to the table.
            accessorKey: "firstName",
            header: "First Name",
        },
        {
            // defines the key from the data object being passed in to the table.
            accessorKey: "lastName",
            header: "Last Name",
        },
        {
            // defines the key from the data object being passed in to the table.
            accessorKey: "nationality",
            header: "NAT",
        },
        {
            // defines the key from the data object being passed in to the table.
            accessorKey: "team",
            header: "Team",
        },
        {
            // defines the key from the data object being passed in to the table.
            accessorKey: "position",
            header: "POS",
        },
        {
            // defines the key from the data object being passed in to the table.
            accessorKey: "overallRating",
            header: "OVR",
        },
    ], []);

    // Tanstack Table instance
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        // Suspense shows "placeholder" content when data loading, swaps to real content when data ready
        <Suspense fallback={<p>Loading...</p>}>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {/* Add sort indicators */}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Suspense>
    )
}