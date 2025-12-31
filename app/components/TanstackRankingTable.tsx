"use client"
import { Suspense, use, useState } from "react";
import { Player, STAT_COLUMNS } from "../types/player";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender, ColumnDef,
    getPaginationRowModel
} from "@tanstack/react-table";
import { useMemo } from "react";
import Avatar from "./Avatar";
import Pagination from "./Pagination";
import {
    TableContainer,
    TableHead,
    TableHeaderRow,
    TableHeaderCell,
    TableBody,
    TableRow,
    TableCell,
} from "./table";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import FilterSidebar from "./FilterSidebar";
import { rankItem } from "@tanstack/match-sorter-utils";

interface TanstackRankingTable {
    playersPromise: Promise<Player[]>
}



const fuzzyFilter = (row: any, columnId: any, value: any, addMeta: any) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
        itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

export default function TanstackRankingTable(
    { playersPromise }: TanstackRankingTable
) {
    // Use the 'use' hook to unwrap the promise and get the actual data
    const players = use(playersPromise);

    // Define data source
    const data = useMemo(() => players, []);

    // State for pagination, including page index and page size
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10, // Default page size is passed as a prop
    });

    // Add global filter state
    const [globalFilter, setGlobalFilter] = useState("");

    // Add filter sidebar state
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

    // Add filter states
    const [activeTab, setActiveTab] = useState<"all" | "mens" | "womens">("all");
    const [sortBy, setSortBy] = useState<string>("rank");

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
            // Custom accessor to use player names for sorting and filtering
            accessorFn: (row) => row.commonName ?? `${row.firstName} ${row.lastName}`,
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
            filterFn: fuzzyFilter,
        },
        {
            accessorKey: "nationality",
            header: "NAT",
            meta: { hoverable: true },
            cell: ({ row }: any) => {
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
            cell: ({ row }: any) => {
                const label = row.original.position?.label?.trim() ?? "";
                if (!label) return null;

                if (/\b(goalkeeper)\b/i.test(label)) {
                    return <div title={label} className="flex items-center justify-center"><span className="font-bold text-white bg-gray-700 px-2 py-1 rounded">GK</span></div>;
                }

                const words = label.split(/[\s-]+/).map((w: any) => w.replace(/[^A-Za-z]/g, "")).filter(Boolean);
                const abbr =
                    words.length === 1
                        ? words[0].slice(0, 2).toUpperCase()
                        : words.map((w: any) => w[0]?.toUpperCase() ?? "").join("");

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
        filterFns: {
            fuzzy: fuzzyFilter, // Register fuzzy filter globally
        },
        state: {
            globalFilter, // Manage the global filter state
            pagination, // Bind pagination state
        },
        onPaginationChange: setPagination, // Handle pagination state changes
        onGlobalFilterChange: setGlobalFilter, // Update the global filter state when it changes
        globalFilterFn: fuzzyFilter, // Specify the fuzzy filter function for global filtering
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), // Enable filtering
        getPaginationRowModel: getPaginationRowModel(),
    })

    const handleResetAll = () => {
        setGlobalFilter("");
        setActiveTab("all");
        setSortBy("rank");
    };

    const handleApplyFilters = (tab: "all" | "mens" | "womens", sort: string) => {
        setActiveTab(tab);
        setSortBy(sort);
        setIsFilterSidebarOpen(false);
    };

    const handleResetFilters = () => {
        setActiveTab("all");
        setSortBy("rank");
    };

    const handleRemoveFilter = (filterType: "tab" | "sort") => {
        if (filterType === "tab") {
            setActiveTab("all");
        } else if (filterType === "sort") {
            setSortBy("rank");
        }
    };

    return (
        <>
            {/* Filter Sidebar */}
            <FilterSidebar
                isOpen={isFilterSidebarOpen}
                onClose={() => setIsFilterSidebarOpen(false)}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
                activeTab={activeTab}
                sortBy={sortBy}
            />

            {/* SearchBar */}
            <div className="w-full bg-black -mt-20 pb-20">
                {/* set value to globalFilter, managed by table state */}
                <SearchBar
                    placeholder="Search players..."
                    onSearch={(query) => setGlobalFilter(query)}
                    value={globalFilter}
                    className="max-w-2xl mx-auto"
                />
            </div >

            {/* Filter Bar */}
            <FilterBar
                onFilterClick={() => setIsFilterSidebarOpen(true)}
                resultsCount={table.getFilteredRowModel().rows.length}
                onResetAll={handleResetAll}
                activeTab={activeTab}
                sortBy={sortBy}
                onRemoveFilter={handleRemoveFilter}
            />
            {/* TODO: Replace loading text with skeleton table */}
            <Suspense fallback={<p className="text-white p-4">Loading...</p>}>
                {/* Table */}
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
                        {/* Show rows when there are results */}
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row, idx) => (
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
                            ))
                        ) : (
                            // Show not found message when no results
                            <TableRow>
                                <TableCell width={100} noPadding={false} colSpan={table.getAllColumns().length}>
                                    <div className="flex flex-col items-center justify-center py-16 text-center w-full">
                                        <div className="text-red-500 text-4xl mb-4">⚠</div>
                                        <h3 className="text-white text-lg font-semibold mb-5">0 Results Found</h3>
                                        <p className="text-white text-xl mb-5">Please try adjusting your search or filters</p>
                                        <button
                                            onClick={() => setGlobalFilter("")}
                                            className="mt-4 px-6 py-2 border border-green-500 text-white text-md font-bold rounded-full hover:bg-green-500 hover:text-black transition"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </TableContainer>

                {/* Pagination */}
                {/* Only show pagination when there are results */}
                {table.getRowModel().rows.length > 0 && (
                    <Pagination
                        currentPage={table.getState().pagination.pageIndex + 1}
                        totalPages={table.getPageCount()}
                        onPageChange={(page) => table.setPageIndex(page - 1)}
                        canPreviousPage={table.getCanPreviousPage()}
                        canNextPage={table.getCanNextPage()}
                    />)}
            </Suspense >
        </>
    )
}