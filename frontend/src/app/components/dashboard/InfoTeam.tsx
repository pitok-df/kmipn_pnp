'use client'

import { teamMemberType } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import UploadProposal from "./UploadProposal";

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then((res) => res.data.data);

export default function InformasiTeam() {
    const router = useRouter();

    // Menggunakan SWR untuk fetch data
    const { data: teamInfo, error } = useSWR<teamMemberType>("/api/v1/team-member", fetcher);

    if (error) {
        if (error.response && error.response.status === 400) {
            router.push("/dashboard/team/compleate");
        }
        console.error(error);
    }

    return (
        <>
            <div className="grid grid-cols-12 gap-30">
                <div className="lg:col-span-3 col-span-12">
                    <div className="border flex justify-between border-l-4 border-l-warning p-4 shadow-sm rounded-sm">
                        <div>
                            <h3>Data Anggota</h3>
                            <p className="font-normal">{teamInfo?.verified ? 'Verified' : "Pending"}</p>
                        </div>
                        <div className="flex justify-center align-middle">
                            <Icon
                                icon="iconoir:verified-user"
                                className="font-bold block mx-auto text-gray-500 leading-6 dark:text-opacity-60 hide-icon"
                                height={35}
                            />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 col-span-12">
                    <div className="border flex justify-between border-l-4 border-l-warning p-4 shadow-sm rounded-sm">
                        <div>
                            <h3>Unggah Proposal</h3>
                            <p className="font-normal">{teamInfo?.statusProposal}</p>
                        </div>
                        <div className="flex justify-center align-middle">
                            <Icon
                                icon="jam:document"
                                className="font-bold block mx-auto text-gray-500 leading-6 dark:text-opacity-60 hide-icon"
                                height={35}
                            />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 col-span-12">
                    <div className="border flex justify-between border-l-4 border-l-warning p-4 shadow-sm rounded-sm">
                        <div>
                            <h3>Penyisihan</h3>
                            <p className="font-normal">{teamInfo?.statusSubmission}</p>
                        </div>
                        <div className="flex justify-center align-middle">
                            <Icon
                                icon="pajamas:stage-all"
                                className="font-bold block mx-auto text-gray-500 leading-6 dark:text-opacity-60 hide-icon"
                                height={35}
                            />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 col-span-12">
                    <div className="border flex justify-between border-l-4 border-l-warning p-4 shadow-sm rounded-sm">
                        <div>
                            <h3>Final</h3>
                            <p className="font-normal">{teamInfo?.round}</p>
                        </div>
                        <div className="flex justify-center align-middle">
                            <Icon
                                icon="ic:round-lan"
                                className="font-bold block mx-auto text-gray-500 leading-6 dark:text-opacity-60 hide-icon"
                                height={35}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-12">
                    <div className="border border-l-4 border-l-warning p-4 shadow-sm rounded-sm">
                        <div className="grid grid-cols-12 gap-30">
                            <div className="lg:col-span-3 md:col-span-4 col-span-12">
                                <h3>Nama Tim</h3>
                            </div>
                            <div className="lg:col-span-9 md:col-span-8 col-span-12">
                                <h3 className="font-normal">{teamInfo?.teamName}</h3>
                            </div>
                            <div className="lg:col-span-3 md:col-span-4 col-span-12">
                                <h3>Kategori</h3>
                            </div>
                            <div className="lg:col-span-9 md:col-span-8 col-span-12">
                                <h3 className="font-normal">{teamInfo?.categori}</h3>
                            </div>
                            <div className="lg:col-span-3 md:col-span-4 col-span-12">
                                <h3>Asal Politeknik</h3>
                            </div>
                            <div className="lg:col-span-9 md:col-span-8 col-span-12">
                                <h3 className="font-normal">{teamInfo?.institution}</h3>
                            </div>
                            <div className="lg:col-span-3 md:col-span-4 col-span-12">
                                <h3>Jumlah Anggota</h3>
                            </div>
                            <div className="lg:col-span-9 md:col-span-8 col-span-12">
                                <h3 className="font-normal">{teamInfo?.teamMembers.length}</h3>
                            </div>
                            <div className="lg:col-span-3 md:col-span-4 col-span-12">
                                <h3>Dosen</h3>
                            </div>
                            <div className="lg:col-span-9 md:col-span-8 col-span-12">
                                <h3 className="font-normal">{teamInfo?.lectureName} ({teamInfo?.lectureNip})</h3>
                            </div>
                            <div className="lg:col-span-3 md:col-span-4 col-span-12">
                                <h3>Proposal</h3>
                            </div>
                            <div className="lg:col-span-9 md:col-span-8 col-span-12">
                                {teamInfo?.verified ?
                                    teamInfo?.linkProposal && teamInfo.verified ?
                                        <a href={teamInfo.linkProposal} className="font-normal text-blue-600" target="_blank">{teamInfo?.linkProposal.split('/')[4]}</a> : (
                                            <UploadProposal />
                                        )
                                    : <h3>Waiting verify</h3>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
