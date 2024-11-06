'use client';

import { Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import EditeUser from './EditUser';
import DeleteUser from './DeleteUser';

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    verified: boolean
};

export default function UserTable({ users, className }: { users: User[], className?: string }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to first page on items per page change
    };

    return (
        <div className={className}>
            <div className='flex justify-between'>
                <div className="mb-4 flex items-center justify-center">
                    <label className="mr-2">Show:</label>
                    <Select
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="rounded"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </Select>
                </div>

                <TextInput
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="rounded"
                />

            </div>
            {/* Search Input */}

            {/* User Table */}
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Role</th>
                        <th className="px-4 py-2 border">Varivied</th>
                        <th className="px-4 py-2 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td className="px-4 py-2 border">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td className="px-4 py-2 border">{user.name}</td>
                            <td className="px-4 py-2 border">{user.email}</td>
                            <td className="px-4 py-2 border">{user.role}</td>
                            <td className="px-4 py-2 border">{user.verified ?
                                <div className='bg-success text-white w-max px-2 text-sm rounded-lg font-bold'><small>Verified</small></div>
                                :
                                <div className='bg-error text-white w-max px-2 text-sm rounded-lg font-bold'><small>Unverified</small></div>
                            }</td>
                            <td className="px-4 py-2 border flex gap-2">
                                <EditeUser user={user} />
                                <DeleteUser user={user} />
                            </td>
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
