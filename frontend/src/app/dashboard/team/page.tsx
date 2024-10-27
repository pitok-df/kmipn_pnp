'use client'

import { Icon } from "@iconify/react/dist/iconify.js";
import { Table } from "flowbite-react";
import { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

// export const metadata: Metadata = {
//     title: "Team Deashbord"
// }

export default function team() {
    return (
        <>
            <h2 className="text-3xl font-bold  mb-6">Team Dashboard!</h2>
            <div className="bg-white p-5 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-3">Informasi Dosen</h3>
                <div className="flex flex-co sm:flex-row sm:items-center gap-4">
                    <p className="text-gray-700">Nama Dosen: <span className="font-semibold">Fazrol Rozi, M.Sc</span></p>
                    <p className="text-gray-700">NIDN/NIP Dosen: <span className="font-semibold">19860721 201012 1 006</span></p>
                </div>
            </div>
            <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray py-6 px-0 relative w-full break-words">
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
                            <Table.Row >
                                <Table.Cell>
                                    <p className="text-base text-wrap">Firman Ardiansyah (Ketua)</p>
                                </Table.Cell>
                                <Table.Cell>
                                    <p className="text-base text-wrap">2211081008</p>
                                </Table.Cell>
                                <Table.Cell>
                                    <p className="text-base text-wrap">ardiansyahfirman2004@gmail.com</p>
                                </Table.Cell>
                                <Table.Cell>
                                    <p className="text-base text-wrap">082283094836</p>
                                </Table.Cell>
                                <Table.Cell>
                                    <p className="text-base text-wrap">D4 Teknologi Rekayasa Perangkat Lunak</p>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link href={"http://localhost:2003/ktm/1729950972087-555979644-diagram.jpg"} target="_blank">
                                        <Icon
                                            icon="solar:link-broken"
                                            className="font-bold block mx-auto text-blue-500 leading-6 dark:text-opacity-60 hide-icon"
                                            height={24}
                                        />
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}