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
  const [selectedUser, setSelectedUser] = useState<TableData | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const itemsPerPage = 10;

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
      if (showUserModal && !target.closest(".user-modal-dropdown")) {
        setShowUserModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showFilter, showUserModal]);

  const renderCellContent = (
    value: string | number | { name: string; avatar: string } | undefined,
    column: TableColumn,
    rowData?: TableData
  ): React.ReactNode => {
    // Handle avatar with name
    if (column.key === "name" && typeof value === "object" && value !== null) {
      return (
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <Image
              src={value.avatar}
              alt={value.name}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-gray-900 truncate">
            {value.name}
          </span>
        </div>
      );
    }

    // Handle user type badges
    if (column.key === "userType" && typeof value === "string") {
      return (
        <span
          className={cn(
            "px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium",
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
            "px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium",
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
    if (column.key === "action" && rowData) {
      return (
        <div className="relative user-modal-dropdown">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700 p-1 sm:p-2"
            onClick={() => {
              setSelectedUser(rowData);
              setShowUserModal(!showUserModal);
            }}
          >
            <Eye size={14} className="sm:mr-1 md:mr-2" />
            <span className="hidden sm:inline">View</span>
          </Button>

          {/* User Details Dropdown Modal */}
          {showUserModal && selectedUser === rowData && (
            <div className="absolute right-0 lg:right-12 xl:right-24 top-full mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-w-[calc(100vw-2rem)]">
              <div className="p-4 sm:p-6">
                {/* User Info Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-yellow-400 flex-shrink-0">
                    <Image
                      src={
                        typeof selectedUser.name === "object" &&
                        selectedUser.name
                          ? selectedUser.name.avatar
                          : "/profile-img.jpg"
                      }
                      alt={
                        typeof selectedUser.name === "object" &&
                        selectedUser.name
                          ? selectedUser.name.name
                          : "User"
                      }
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                      {typeof selectedUser.name === "object" &&
                      selectedUser.name
                        ? selectedUser.name.name
                        : "Unknown User"}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm truncate">
                      {String(selectedUser.email || "")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-2 flex-shrink-0">
                    <span
                      className={cn(
                        "px-2 sm:px-3 py-1 rounded text-xs font-medium text-center",
                        selectedUser.status === "Active"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-500"
                      )}
                    >
                      {String(selectedUser.status || "")}
                    </span>
                    <span
                      className={cn(
                        "px-2 sm:px-3 py-1 rounded text-xs font-medium text-center",
                        selectedUser.userType === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      )}
                    >
                      {String(selectedUser.userType || "")}
                    </span>
                  </div>
                </div>

                {/* Purchase Details Section */}
                <div>
                  <h4 className="text-base font-semibold text-gray-700 mb-3">
                    Purchase Details
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500 font-medium block mb-1">
                          Issue Date
                        </span>
                        <span className="text-sm text-gray-700">
                          {selectedUser.issueDate
                            ? new Date(
                                selectedUser.issueDate as string
                              ).toLocaleDateString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              })
                            : "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 font-medium block mb-1">
                          Amount
                        </span>
                        <span className="text-lg font-bold text-purple-600">
                          ${String(selectedUser.amount || "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Handle amount formatting
    if (
      column.key === "amount" &&
      (typeof value === "string" || typeof value === "number")
    ) {
      return <span className="font-semibold text-gray-900">${value}</span>;
    }

    // Handle email with truncation
    if (column.key === "email" && typeof value === "string") {
      return (
        <span className="text-gray-600 truncate max-w-[150px] md:max-w-[200px] lg:max-w-none block">
          {value}
        </span>
      );
    }

    return String(value || "");
  };

  return (
    <div
      className={`px-3 bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 gap-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          {title}
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
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
                className="pl-10 pr-4 py-2 w-full sm:w-48 md:w-64 border-gray-300 bg-gray-100 rounded-lg"
              />
            </div>
          )}

          {filterable && (
            <div className="relative filter-dropdown">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 bg-gray-100 w-full sm:w-auto"
                onClick={() => setShowFilter(!showFilter)}
              >
                <PiSlidersHorizontalThin size={20} />
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
      <div className="w-full">
        <Table>
          <TableHeader className="border-none gap-2 bg-transparent">
            <TableRow className="bg-transparent border-none">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "font-semibold text-gray-700 py-2 px-1 sm:px-2 md:px-3 lg:px-6 bg-gray-100 gap-2 text-xs sm:text-sm",
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
                    className={cn(
                      "py-3 sm:py-4 px-1 sm:px-2 md:px-3 lg:px-6 text-xs sm:text-sm",
                      column.className
                    )}
                  >
                    {renderCellContent(row[column.key], column, row)}
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
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-200 gap-4">
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
        <div className="text-xs sm:text-sm md:text-base text-gray-700">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)}{" "}
          of {filteredData.length} results
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
