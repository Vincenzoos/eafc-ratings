"use client"
import { Suspense, use } from "react";
import { Player, STAT_COLUMNS } from "../types/player";
import { useReactTable, getCoreRowModel, flexRender, Row, ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import Avatar from "./Avatar";
import {
    TableContainer,
    TableHead,
    TableHeaderRow,
    TableHeaderCell,
    TableBody,
    TableRow,
    TableCell,
} from "./table";

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
        // Left margin column
        {
            id: "leftMargin",
            header: "",
            cell: () => null,
            size: 200, // Adjust this value to control left padding
        },
        {
            accessorKey: "rank",
            header: "RANK",
            cell: ({ row }) => (
                <div className="text-2xl font-extrabold text-center">{row.original.rank}</div>
            ),
            size: 60,
        },
        {
            accessorKey: "player",
            header: "PLAYER",
            meta: { hoverable: true },
            cell: ({ row }) => {
                const p = row.original;
                return (
                    <div className="flex items-center gap-3 min-w-max py-1">
                        <Avatar src={p.shieldUrl} alt={`${p.firstName} ${p.lastName} shield`} />
                        <span className="text-lg text-white">{p.commonName ?? `${p.firstName} ${p.lastName}`}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "nationality",
            header: "NAT",
            meta: { hoverable: true },
            cell: ({ row }) => {
                const nat = row.original.nationality;
                if (!nat) return null;
                return (
                    <div className="flex items-center justify-center">
                        <img
                            src={nat.imageUrl}
                            alt={nat.label}
                            width={50}
                            className="object-cover rounded-sm"
                            loading="lazy"
                        />
                    </div>
                );
            },
            size: 85,
        },
        {
            accessorKey: "team",
            header: "TEAM",
            meta: { hoverable: true },
            cell: ({ row }: any) => {
                const team = row.original.team;
                if (!team) return null;
                return (
                    <div className="flex items-center justify-center">
                        <img
                            src={team.imageUrl}
                            alt={team.label}
                            width={50}
                            className="object-cover rounded-sm"
                            loading="lazy"
                        />
                    </div>
                );
            },
            size: 80,
        },
        {
            accessorKey: "position",
            header: "POS",
            meta: { hoverable: true },
            cell: ({ row }) => {
                const label = row.original.position?.label?.trim() ?? "";
                if (!label) return null;

                if (/\b(goalkeeper)\b/i.test(label)) {
                    return <div title={label} className="flex items-center justify-center"><span className="font-bold text-white bg-gray-700 px-2 py-1 rounded">GK</span></div>;
                }

                const words = label.split(/[\s-]+/).map(w => w.replace(/[^A-Za-z]/g, "")).filter(Boolean);
                const abbr =
                    words.length === 1
                        ? words[0].slice(0, 2).toUpperCase()
                        : words.map(w => w[0]?.toUpperCase() ?? "").join("");

                return <div title={label} className="flex items-center justify-center"><span className="font-bold text-white bg-gray-700 px-2 py-1 rounded">{abbr}</span></div>;
            },
            size: 50,
        },
        {
            accessorKey: "overallRating",
            header: "OVR",
            cell: ({ row }) => (
                <div className="w-full h-full flex items-center justify-center bg-gray-700 py-6 rounded  font-normal text-lg">{row.original.overallRating}</div>
            ),
            size: 150,
        },
        ...STAT_COLUMNS.map((stat, index) => ({
            accessorFn: (row: Player) => row.stats?.[stat.key] ?? "-",
            header: stat.label,
            meta: { fillBackground: true },
            cell: ({ row }: any) => {
                const value = row.original.stats?.[stat.key]?.value ?? "-";
                const isFirstStat = index === 0;
                const isLastStat = index === STAT_COLUMNS.length - 1;
                const borderRadiusClass = `${isFirstStat ? 'rounded-l' : ''} ${isLastStat ? 'rounded-r' : ''}`;

                return (
                    <div className={`w-full h-full flex items-center justify-center bg-gray-700 py-6 ${borderRadiusClass}`}>
                        <span className="text-center text-gray-300 font-normal text-lg">{value}</span>
                    </div>
                );
            },
            size: 100,
        })),
        // Right margin column
        {
            id: "rightMargin",
            header: "",
            cell: () => null,
            size: 200, // Adjust this value to control right padding
        },
    ], []);

    // Tanstack Table instance
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Suspense fallback={<p className="text-white p-4">Loading...</p>}>
            <TableContainer>
                <TableHead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableHeaderRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHeaderCell
                                    key={header.id}
                                    width={header.getSize()}
                                    align={["player"].includes(header.column.id) ? "left" : "center"}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHeaderCell>
                            ))}
                        </TableHeaderRow>
                    ))}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map((row, idx) => (
                        <TableRow
                            key={row.id}
                            isAlternate={idx % 2 !== 0}
                        >
                            {row.getVisibleCells().map(cell => (
                                <TableCell
                                    key={cell.id}
                                    width={cell.column.columnDef.size}
                                    isHoverable={!!(cell.column.columnDef as any).meta?.hoverable}
                                    noPadding={!!(cell.column.columnDef as any).meta?.fillBackground}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </TableContainer>
        </Suspense >
    )
}