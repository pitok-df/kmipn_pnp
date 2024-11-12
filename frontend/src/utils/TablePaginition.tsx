'use client';

import { faInfoCircle, faPencil, faTrash, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Select, TextInput } from 'flowbite-react';
import { link } from 'fs/promises';
import { uniqueId } from 'lodash';
import Link from 'next/link';
import { useState } from 'react';

type TableProps<T> = {
    data: T[];
    headers: Array<keyof T>; // Field names dynamically
    columns: (keyof T)[];
    className?: string;
    perPages?: number;
    onEdit?: (item: any) => void;
    onDetail?: (item: any) => void;
    onDelete?: any;
};

export default function Table<T>({ data, headers, columns, className, perPages = 10, onEdit, onDelete, onDetail }: TableProps<T>) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(perPages);

    const filteredData = data.filter(item =>
        columns.some(column => {
            const value = item[column];
            return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
        })
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className={className}>
            <div className='flex justify-between'>
                <div className="mb-4 flex items-center">
                    <label className="mr-2">Show:</label>
                    <Select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="rounded"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </Select>
                </div>

                <TextInput
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="rounded"
                />
            </div>

            {/* Dynamic Table */}
            <table className="min-w-full border">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header as string} className="px-4 py-2 border">
                                {header.toString().toUpperCase()}
                            </th>
                        ))}
                        {(onEdit || onDelete || onDetail) && <th className="px-4 py-2 border">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={uniqueId()}>
                            {headers.map((item) => (item === '#' ?
                                <td key={uniqueId()} className='px-4 py-2 border'>
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                : ""))}
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="px-4 py-2 border">
                                    {String(item[column] ?? '~')}
                                </td>
                            ))}
                            {(onEdit || onDelete || onDetail) && (
                                <td key={uniqueId()} className="px-4 py-2 border flex gap-3">
                                    {onEdit && <Button color={'warning'} size={'sm'} onClick={() => onEdit(item)} className="border text-white bg-warning hover:bg-warning w-max outline-none focus:outline-none">
                                        <FontAwesomeIcon icon={faPencil} size="1x" color="white" />
                                    </Button>}
                                    {onDelete &&
                                        <Button as={'button'} onClick={() => onDelete(item)} color={'error'} size={'sm'}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    }
                                    {onDetail &&
                                        <Button as={Link} href='#' onClick={() => onDetail(item)} color={'success'} size={'sm'}>
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                        </Button>
                                    }
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <nav aria-label="Page navigation example" className="mt-4">
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handlePageChange(index + 1)}
                                className={`flex items-center justify-center px-3 h-8 leading-tight border ${currentPage === index + 1
                                    ? 'text-blue-600 bg-blue-50 border-gray-300'
                                    : 'text-gray-500 bg-white border-gray-300'
                                    } hover:bg-gray-100 hover:text-gray-700`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
