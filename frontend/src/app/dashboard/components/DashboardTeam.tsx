'use client'

import { teamMemberType } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { Table } from "flowbite-react";
import { uniqueId } from "lodash";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";
import Loading from "../team/loading";


const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data.data);

export default function DashboardTeamData() {
    // Menggunakan SWR untuk fetching data
    const { data: teamMembers, error } = useSWR<teamMemberType>("/api/v1/team-member", fetcher, {
        revalidateOnFocus: false, // Data tidak akan difetch ulang saat window di-fokuskan kembali
        revalidateOnReconnect: false, // Data tidak akan difetch ulang saat koneksi tersambung
        shouldRetryOnError: false, // Tidak akan retry jika terjadi error
    });

    if (error) {
        console.error("Error fetching team members data:", error);
        return <div>Gagal memuat data anggota tim</div>;
    }

    // Redirect jika data team belum lengkap
    useEffect(() => {
        const teamCompleate = async () => {
            try {
                const response = await axios.get('/api/v1/check-team-compleate');
                if (!response.data.teamDataCompleate) {
                    window.location.href = '/dashboard/team/compleate';
                }
            } catch (error) {
                console.log("Error checking team completion:", error);
            }
        }
        teamCompleate();
    }, []);

    if (!teamMembers) {
        return <Loading />; // Loading state
    }

    return (
        <>
            <div className="bg-white p-5 rounded-sm shadow-md mb-8 border-l-4 border-warning">
                <h3 className="text-xl font-semibold mb-3">Informasi Dosen</h3>
                <div className="flex flex-co sm:flex-row sm:items-center gap-4">
                    <p className="text-gray-700">Nama Dosen: <span className="font-semibold">{teamMembers?.lectureName}</span></p>
                    <p className="text-gray-700">NIDN/NIP Dosen: <span className="font-semibold">{teamMembers?.lectureNip}</span></p>
                </div>
            </div>
            <div className="rounded-sm dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray py-6 px-0 relative w-full break-words border-l-4 border-warning">
                <div className="px-6 mb-3 divide-y divide-border dark:divide-darkborder">
                    <h3 className="card-title">Anggota Team</h3>
                </div>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Nama</Table.HeadCell>
                            <Table.HeadCell>NIM</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>No WA</Table.HeadCell>
                            <Table.HeadCell>Program Studi</Table.HeadCell>
                            <Table.HeadCell>KTM</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y divide-border dark:divide-darkborder ">
                            {teamMembers?.teamMembers.map((member) => (
                                <Table.Row key={uniqueId()}>
                                    <Table.Cell>
                                        <h3 className="font-normal text-wrap">{member.name} {member.role === 'leader' ? "(Ketua)" : ''}</h3>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p className=" font-normal text-wrap">{member.nim}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p className=" font-normal text-wrap">{member.email}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p className=" font-normal text-wrap">{member.noWA}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p className=" font-normal text-wrap">{member.prodi}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link href={member.fileKTM} target="_blank">
                                            <Icon
                                                icon="solar:link-broken"
                                                className="font-bold block mx-auto text-blue-500 leading-6 dark:text-opacity-60 hide-icon"
                                                height={22}
                                            />
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}
