"use client"
import { Suspense, use } from "react";
import { Player } from "../types/player";
import { useReactTable, getCoreRowModel, flexRender, Row, ColumnDef } from "@tanstack/react-table";
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
    const columns: ColumnDef<Player>[] = useMemo(() => [
        {
            // defines the key from the data object being passed in to the table.
            accessorKey: "rank",
            header: "Rank",
        },
        {
            // Compute field for full name, allow sorting/filtering
            // can use cell if sorting/fitering on field not needed
            accessorFn: (row: Player) => `${row.firstName} ${row.lastName}`,
            header: "Player",
            cell: ({ row }) => {
                const p = row.original;
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <img src={p.shieldUrl} alt={`${p.firstName} ${p.lastName} shield`} width={24} height={24} style={{ borderRadius: 4 }} />
                        <span>{`${p.firstName} ${p.lastName}`}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "nationality",
            header: "NAT",
            cell: ({ row }) => {
                const nat = row.original.nationality;
                if (!nat) return null; // safety: no nationality
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <img
                            src={nat.imageUrl}
                            alt={nat.label}
                            width={20}
                            height={14}
                            style={{ objectFit: "cover", borderRadius: 2 }}
                            loading="lazy"
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: "team",
            header: "TEAM",
            cell: ({ row }) => {
                const team = row.original.team;
                if (!team) return null; // safety: no nationality
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <img
                            src={team.imageUrl}
                            alt={team.label}
                            width={20}
                            height={14}
                            style={{ objectFit: "cover", borderRadius: 2 }}
                            loading="lazy"
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: "position",
            header: "POS",
            cell: ({ row }) => {
                const label = row.original.position?.label?.trim() ?? "";
                if (!label) return null;

                // Special-case goalkeeper/keeper -> "GK"
                if (/\b(goalkeeper)\b/i.test(label)) {
                    return <span title={label}>GK</span>;
                }

                // Split on spaces and hyphens, remove empty parts
                const words = label.split(/[\s-]+/).map(w => w.replace(/[^A-Za-z]/g, "")).filter(Boolean);

                const abbr =
                    words.length === 1
                        ? words[0].slice(0, 2).toUpperCase()           // single word -> first 2 letters uppercased
                        : words.map(w => w[0]?.toUpperCase() ?? "").join(""); // multiword -> first letters

                return <span title={label}>{abbr}</span>;
            },
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