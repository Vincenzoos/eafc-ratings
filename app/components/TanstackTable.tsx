"use client"

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
    SortingState,
    getSortedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import mockData from "../database/mockData.json";
import { rankItem } from "@tanstack/match-sorter-utils";



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


function TanstackTable() {

    const data = useMemo(() => mockData, []);
    // Define table columns to pass into table
    const columns = useMemo(
        () => [
            {
                // defines the key from the data object being passed in to the table.
                accessorKey: "name", // Accessor key for the "name" field from data object
                header: "Name", // Column header
                filterFn: fuzzyFilter,
            },
            {
                accessorKey: "category",
                header: "Category",
                filterFn: fuzzyFilter,
            },
            {
                accessorKey: "price",
                header: "Price",
                // The cell property allows you to access the data passed into each row.
                // You can use this to perform operations such as formatting data.
                cell: (info: any) => `$${info.getValue().toFixed(2)}`, // Format price as currency
                filterFn: fuzzyFilter,
            },
            {
                accessorKey: "inStock",
                header: "In Stock",
                filterFn: fuzzyFilter,
            },
        ],
        []
    );

    // Define states for global filtering and sorting
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);

    // State for pagination, including page index and page size
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10, // Default page size is passed as a prop
    });

    // Initialize the table instance with data, columns, and row model
    // Create the table instance
    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter, // Register fuzzy filter globally
        },
        state: {
            globalFilter, // Manage the global filter state
            sorting, // Manage the sorting state
            pagination, // Bind pagination state
        },
        onGlobalFilterChange: setGlobalFilter, // Update the global filter state when it changes
        globalFilterFn: fuzzyFilter, // Specify the fuzzy filter function for global filtering
        onSortingChange: setSorting, // Update the sorting state when sorting changes
        onPaginationChange: setPagination, // Handle pagination state changes
        getCoreRowModel: getCoreRowModel(), // Core row model for displaying rows
        getFilteredRowModel: getFilteredRowModel(), // Enable filtering functionality
        getSortedRowModel: getSortedRowModel(), // Enable sort
        getPaginationRowModel: getPaginationRowModel(), // Enable pagination
    });
    return (
        <div>
            {/* Input field for global search */}
            <input
                type="text"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search..."
                style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
            />
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    onClick={header.column.getToggleSortingHandler()} // Click handler for column sorting
                                    style={{
                                        cursor: header.column.getCanSort() ? "pointer" : "default",
                                    }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    {header.column.getIsSorted() === "asc"
                                        ? "🔼"
                                        : header.column.getIsSorted() === "desc"
                                            ? "🔽"
                                            : null}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: "10px" }}>
                {/* Pagination controls */}
                <button
                    onClick={() => table.previousPage()} // Go to the previous page
                    disabled={!table.getCanPreviousPage()} // Disable if on the first page
                >
                    {"<"}
                </button>
                <button
                    onClick={() => table.nextPage()} // Go to the next page
                    disabled={!table.getCanNextPage()} // Disable if on the last page
                >
                    {">"}
                </button>

                {/* Display current page number and total page count */}
                <span>
                    Page{" "}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                </span>
            </div>
        </div>
    );
}

export default TanstackTable;