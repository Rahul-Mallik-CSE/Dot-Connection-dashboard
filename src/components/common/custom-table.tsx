/** @format */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Search, Eye, Users, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PiSlidersHorizontalThin } from "react-icons/pi";

interface TableColumn {
  key: string;
  header: string;
  className?: string;
}

interface TableData {
  [key: string]: string | number | { name: string; avatar: string } | undefined;
}

interface CustomTableProps {
  title: string;
  columns: TableColumn[];
  data: TableData[];
  searchable?: boolean;
  filterable?: boolean;
  className?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
  title,
  columns,
  data,
  searchable = true,
  filterable = true,
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const itemsPerPage = 15;

  // Filter options based on the image
  const filterOptions = [
    { value: "all", label: "All Users", icon: Users },
    { value: "active", label: "Active User", icon: UserCheck },
    { value: "inactive", label: "Inactive User", icon: Users },
    { value: "paid", label: "Paid User", icon: null },
    { value: "free", label: "Unpaid User", icon: null },
  ];

  const filteredData = React.useMemo(() => {
    let filtered = data;

    // Apply search filter (search by name only)
    if (searchTerm) {
      filtered = filtered.filter((row) => {
        const nameValue = row.name;
        if (typeof nameValue === "object" && nameValue !== null) {
          return nameValue.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
        return false;
      });
    }

    // Apply status/type filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter((row) => {
        switch (selectedFilter) {
          case "active":
            return row.status === "Active";
          case "inactive":
            return row.status === "Inactive";
          case "paid":
            return row.userType === "Paid";
          case "free":
            return row.userType === "Free";
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [data, searchTerm, selectedFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFilter]);

  // Close filter dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showFilter && !target.closest(".filter-dropdown")) {
        setShowFilter(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showFilter]);

  const renderCellContent = (
    value: string | number | { name: string; avatar: string } | undefined,
    column: TableColumn
  ): React.ReactNode => {
    // Handle avatar with name
    if (column.key === "name" && typeof value === "object" && value !== null) {
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={value.avatar}
              alt={value.name}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-gray-900">{value.name}</span>
        </div>
      );
    }

    // Handle user type badges
    if (column.key === "userType" && typeof value === "string") {
      return (
        <span
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium",
            value === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          )}
        >
          {value}
        </span>
      );
    }

    // Handle status badges
    if (column.key === "status" && typeof value === "string") {
      return (
        <span
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium",
            value === "Active"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-500"
          )}
        >
          {value}
        </span>
      );
    }

    // Handle action buttons
    if (column.key === "action") {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          <Eye size={16} className="mr-2" />
          View
        </Button>
      );
    }

    // Handle amount formatting
    if (
      column.key === "amount" &&
      (typeof value === "string" || typeof value === "number")
    ) {
      return <span className="font-semibold text-gray-900">${value}</span>;
    }

    return String(value || "");
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

        <div className="flex items-center gap-3">
          {searchable && (
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border-gray-300 bg-gray-100 rounded-lg"
              />
            </div>
          )}

          {filterable && (
            <div className="relative filter-dropdown">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-gray-100"
                onClick={() => setShowFilter(!showFilter)}
              >
                <PiSlidersHorizontalThin size={25} />
                Filter
              </Button>

              {/* Filter Dropdown */}
              {showFilter && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-3">
                    {filterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedFilter(option.value);
                          setShowFilter(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md hover:bg-gray-50 transition-colors",
                          selectedFilter === option.value
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700"
                        )}
                      >
                        {option.icon && (
                          <option.icon size={16} className="text-gray-500" />
                        )}
                        <span>{option.label}</span>
                        {selectedFilter === option.value && (
                          <div className="ml-auto w-4 h-4 rounded-full border-2 border-blue-500 bg-blue-500"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="border-none gap-2 bg-transparent">
            <TableRow className="bg-transparent border-none">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "font-semibold text-gray-700 py-2 px-6 bg-gray-100 gap-2 ",
                    column.className
                  )}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((row, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-50 transition-colors"
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={cn("py-4 px-6", column.className)}
                  >
                    {renderCellContent(row[column.key], column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty state */}
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? "No results found" : "No data available"}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  // Show first page, last page, current page, and pages around current page
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={page === currentPage}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                }
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      <div className="w-full flex justify-end pr-4 pb-3">
        <div className="text-base text-gray-700">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)}{" "}
          of {filteredData.length} results
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
