import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    canPreviousPage: boolean;
    canNextPage: boolean;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    canPreviousPage,
    canNextPage,
}: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showEllipsisStart = currentPage > 4;
        const showEllipsisEnd = currentPage < totalPages - 3;

        if (totalPages <= 9) {
            // Show all pages if 9 or fewer
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (showEllipsisStart) {
                pages.push('...');
                // Show current page and surrounding pages
                const start = Math.max(2, currentPage - 2);
                const end = Math.min(totalPages - 1, currentPage + 2);
                for (let i = start; i <= end; i++) {
                    pages.push(i);
                }
            } else {
                // Show pages 2-7
                for (let i = 2; i <= Math.min(7, totalPages - 1); i++) {
                    pages.push(i);
                }
            }

            if (showEllipsisEnd) {
                pages.push('...');
            } else if (currentPage < totalPages - 3) {
                // Show pages near the end
                for (let i = totalPages - 6; i < totalPages; i++) {
                    if (i > 1 && !pages.includes(i)) {
                        pages.push(i);
                    }
                }
            }

            // Always show last page
            if (!pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2 mt-8 mb-4">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!canPreviousPage}
                className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-green-400 hover:cursor-pointer text-white hover:bg-[#2a2a2a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
            >
                <ArrowLeft />
            </button>

            {/* Page Numbers */}
            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            className="flex items-center justify-center w-14 h-14 text-gray-400"
                        >
                            ...
                        </span>
                    );
                }

                const isActive = page === currentPage;
                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page as number)}
                        className={`flex items-center justify-center w-14 h-14 font-medium hover:cursor-pointer ${isActive
                            ? 'bg-green-600 text-white rounded-full'
                            : 'text-white hover:bg-[#2a2a2a] hover:rounded-full duration-200'
                            }`}
                        aria-label={`Page ${page}`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!canNextPage}
                className="flex items-center justify-center w-14 h-14 rounded-full hover:cursor-pointer border-2 border-green-400 text-white hover:bg-[#2a2a2a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
            >
                <ArrowRight />
            </button>
        </div>
    );
}
