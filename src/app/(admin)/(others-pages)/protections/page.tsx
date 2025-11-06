"use client";

import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
} from "@/components/ui/table";
import {
    Search,
    Pencil,
    Trash2,
    Plus,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

interface Protection {
    id: number;
    manufacturer: string;
    protectionType: string;
    regReference?: string;
    externalLink?: string;
    designation?: string;
    oePartNo?: string;
}

const allProtections: Protection[] = [
    {
        id: 1,
        manufacturer: "Mercedes-Benz",
        protectionType: "Designschutz",
        designation: "sdjf aserfjhsdfg sdfkjsadf sgkjsdfökljfds",
    },
    { id: 2, manufacturer: "Ford", protectionType: "Sonstige" },
    { id: 3, manufacturer: "Fiat", protectionType: "Sonstige" },
    {
        id: 4,
        manufacturer: "Ford",
        protectionType: "Designschutz",
        designation: "test1",
    },
    {
        id: 5,
        manufacturer: "Opel",
        protectionType: "Sonstige",
        regReference: "cgdsfg",
        designation: "xvxvxvc",
    },
    {
        id: 6,
        manufacturer: "Volkswagen AG",
        protectionType: "Designschutz",
        designation: "dddhjlgfjhlgjfhnd",
    },
];

export default function ProtectionsPage() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;

    const filtered = allProtections.filter((item) =>
        item.manufacturer.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                    Protections
                </h2>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search protections..."
                            className="pl-9 pr-4 text-sm border-gray-200 dark:border-gray-800"
                            defaultValue={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4">
                        <Plus size={16} />
                        Create Protection
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
                <Table>
                    <TableHeader className="bg-gray-50 dark:bg-white/[0.04] border-b border-gray-200 dark:border-gray-800">
                        <TableRow>
                            <TableCell isHeader className="py-3 px-5 font-medium text-gray-600 text-sm">
                                Manufacturer
                            </TableCell>
                            <TableCell isHeader className="py-3 px-5 font-medium text-gray-600 text-sm">
                                Protection Type
                            </TableCell>
                            <TableCell isHeader className="py-3 px-5 font-medium text-gray-600 text-sm">
                                Reg Reference
                            </TableCell>
                            <TableCell isHeader className="py-3 px-5 font-medium text-gray-600 text-sm">
                                External Link
                            </TableCell>
                            <TableCell isHeader className="py-3 px-5 font-medium text-gray-600 text-sm">
                                Designation
                            </TableCell>
                            <TableCell isHeader className="py-3 px-5 font-medium text-gray-600 text-sm">
                                OE Part No
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 px-5 font-medium text-gray-600 text-sm text-right"
                            >
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginated.map((item, index) => (
                            <TableRow
                                key={item.id}
                                className={`transition-colors ${index % 2 === 0
                                        ? "bg-white dark:bg-transparent"
                                        : "bg-gray-50/50 dark:bg-white/[0.02]"
                                    } hover:bg-gray-100/60 dark:hover:bg-white/[0.05]`}
                            >
                                <TableCell className="py-3 px-5 font-medium text-gray-800 dark:text-white/90">
                                    {item.manufacturer}
                                </TableCell>
                                <TableCell className="py-3 px-5 text-gray-600 text-sm">
                                    {item.protectionType}
                                </TableCell>
                                <TableCell className="py-3 px-5 text-gray-600 text-sm">
                                    {item.regReference || "-"}
                                </TableCell>
                                <TableCell className="py-3 px-5 text-gray-600 text-sm">
                                    {item.externalLink || "-"}
                                </TableCell>
                                <TableCell className="py-3 px-5 text-gray-600 text-sm">
                                    {item.designation || "-"}
                                </TableCell>
                                <TableCell className="py-3 px-5 text-gray-600 text-sm">
                                    {item.oePartNo || "-"}
                                </TableCell>
                                <TableCell className="py-3 px-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 border-gray-200 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-white/[0.06]"
                                        >
                                            <Pencil size={16} className="text-gray-600" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 border-gray-200 hover:border-red-500 hover:bg-red-50 dark:hover:bg-white/[0.06]"
                                        >
                                            <Trash2 size={16} className="text-red-500" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="h-8 w-8 border-gray-200 disabled:opacity-50"
                >
                    <ChevronLeft size={16} />
                </Button>

                {[...Array(totalPages)].map((_, i) => (
                    <Button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        className={`h-8 w-8 text-sm ${currentPage === i + 1
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                            }`}
                    >
                        {i + 1}
                    </Button>
                ))}

                <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="h-8 w-8 border-gray-200 disabled:opacity-50"
                >
                    <ChevronRight size={16} />
                </Button>
            </div>
        </div>
    );
}
