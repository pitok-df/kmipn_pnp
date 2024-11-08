'use client';

import { AllTeamDataType, teamMemberType } from '@/utils/types';
import { Select, TextInput } from 'flowbite-react';
import { uniqueId } from 'lodash';
import { useState } from 'react';
import DetailTeam from './detailTeam';

export default function AllTeamTables({ data, className }: { data: AllTeamDataType[], className?: string }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page
    const [filter, setFilter] = useState(''); // Default items per page

    const filteredTeams = data.filter(team => {
        const mathcesSearch = team.teamName.toLowerCase().includes(searchTerm.toLowerCase());
        const mathcesFilter = filter === '' || String(team.verified) === filter
        return mathcesSearch && mathcesFilter;
    });

    const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);
    const paginatedUsers = filteredTeams.slice(
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

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value)
        setCurrentPage(1)
    }

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

                <div className='flex gap-3'>
                    <div className="mb-4 flex items-center justify-center">
                        <label className="mr-2">Filter:</label>
                        <Select
                            value={filter}
                            onChange={handleFilter}
                            className="rounded"
                        >
                            <option value="">All</option>
                            <option value={'true'}>Verified</option>
                            <option value={'false'}>Unverified</option>
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

            </div>
            {/* Search Input */}

            {/* User Table */}
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Team Name</th>
                        <th className="px-4 py-2 border">Category</th>
                        <th className="px-4 py-2 border">Lecture Name</th>
                        <th className="px-4 py-2 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.map((data, index) => (
                        <tr key={uniqueId()}>
                            <td className="px-4 py-2 border">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td className="px-4 py-2 border">
                                <div className="h-10 w-max flex justify-center items-center cursor-pointer relative">
                                    {data.teamName}
                                    <div className={`flex items-center font-medium text-white text-xs h-2 w-2 rounded-full absolute end-[-10px] top-[10px] ${data.verified ? 'bg-success' : 'bg-error'} p-0`}></div>
                                </div>
                            </td>
                            <td className="px-4 py-2 border">{data.categori}</td>
                            <td className="px-4 py-2 border">{data.lectureName}</td>
                            <td className="px-4 py-2 border">
                                <DetailTeam data={data} />
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
