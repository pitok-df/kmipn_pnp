'use client'

import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import React, { useRef, useState } from "react";
import CategoryLomba from "../components/Category";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"
import { Metadata } from "next";
import ListPerguruangTinggi from "../components/ListPT";
import TeamMemberForm from "../components/TeamMemberForm";
import apiClient from "@/utils/apiClient";
import { getCookie } from "cookies-next";

// export const metadata: Metadata = {
//     title: "Dashboard Team",
//     description: "Manage your team",
// };

export default function team() {
    console.log(getCookie("accessToken"));

    const [teamName, setTeamName] = useState('');
    const [kategori, setKategori] = useState('');
    const [asalPoliteknik, setAsalPoliteknik] = useState('');
    const [dosenPendaming, setDosenPendaming] = useState('');
    const [nipDosen, setNipDosen] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [proposal, setProposal] = useState<File | null>(null);
    const fileInputRef = useRef(null);

    const [teamMembers, setTeamMembers] = useState([
        { nama_anggota: '', nim: '', no_wa: '', email: '', prodi: '', foto_ktm: null as File | null },
        { nama_anggota: '', nim: '', no_wa: '', email: '', prodi: '', foto_ktm: null as File | null },
        { nama_anggota: '', nim: '', no_wa: '', email: '', prodi: '', foto_ktm: null as File | null }
    ]);

    const handleInputChange = (index: number, field: 'nama_anggota' | 'nim' | 'no_wa' | 'email' | 'prodi' | 'foto_ktm', value: string | File) => {
        const newTeamMembers = [...teamMembers];
        if (field === 'foto_ktm') {
            newTeamMembers[index][field] = value as File;
        } else {
            newTeamMembers[index][field] = value as string;
        }
        setTeamMembers(newTeamMembers);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // ubah state is loading jadi true
        setIsLoading(true);
        try {
            // simpan data dosen ke api
            const lecture = await apiClient.post(`${process.env.NEXT_PUBLIC_BASEURL_BACKEND}/lecture`,
                { name: dosenPendaming, nip: nipDosen }, { headers: { "Content-Type": "application/json" } });

            // ambil id dosen yang baru saja dibuat
            const lectureID = lecture.data.data.id;
            console.log("save data team");
            // buat data team
            const team = await apiClient.post(`${process.env.NEXT_PUBLIC_BASEURL_BACKEND}/team`,
                { name: teamName, categori: kategori, instansi: asalPoliteknik, dosen: lectureID }, { headers: { "Content-Type": "application/json" } });

            // ambil id team yang baru saja dibuat
            const idTeam = team.data.data.id;
            console.log("save data proposal");
            const proposalr = await apiClient.post(`${process.env.NEXT_PUBLIC_BASEURL_BACKEND}/proposal?type=proposal`,
                { teamID: idTeam, file_proposal: proposal }, { headers: { "Content-Type": "multipart/form-data;application/json" } });

            teamMembers.forEach(async (item, index) => {
                if (index === 0) {
                    const createTeamMember = await apiClient.post(`${process.env.NEXT_PUBLIC_BASEURL_BACKEND}/team-member?type=ktm`, {
                        teamId: idTeam, userId: localStorage.getItem("idUser"), role: "leader", nim: item.nim, email: item.email,
                        no_WA: item.no_wa, prodi: item.prodi, file_ktm: item.foto_ktm, name: item.nama_anggota
                    }, { headers: { "Content-Type": "multipart/form-data;application/json" } });
                    if (!createTeamMember) { return };
                } else {
                    const createTeamMember = await apiClient.post(`${process.env.NEXT_PUBLIC_BASEURL_BACKEND}/team-member?type=ktm`, {
                        teamId: idTeam, userId: null, role: "member", nim: item.nim, email: item.email,
                        no_WA: item.no_wa, prodi: item.prodi, file_ktm: item.foto_ktm, name: item.nama_anggota
                    }, { headers: { "Content-Type": "multipart/form-data;application/json" } });
                    if (!createTeamMember) { return };
                }
            });

            if (fileInputRef.current) {
                const file: any = fileInputRef.current;
                file.value = ''
            }

            toast.success("Successfully saved data team.")
            setTeamName("")
            setNipDosen("")
            setIsLoading(false);
            setAsalPoliteknik("")
            setDosenPendaming("")
            setKategori("")
            setProposal(null)
            setTeamMembers([...teamMembers])

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to save team data."
            toast.error(errorMessage)
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
                <form onSubmit={handleSubmit}>
                    <h5 className="card-title">Data Team</h5>
                    <div className="mt-6">
                        <div className="grid grid-cols-12 gap-30">
                            <div className="lg:col-span-6 col-span-12">
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="name" value="Nama Tim" />
                                        </div>
                                        <TextInput
                                            id="name"
                                            value={teamName}
                                            onChange={(e) => setTeamName(e.target.value)}
                                            type="text"
                                            placeholder="Nama Tim"
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="kategori3" value="Kategori Lomba" />
                                        </div>
                                        <Select id="kategori3" value={kategori} onChange={(e) => { setKategori(e.target.value) }} required className="select-rounded">
                                            <option value="">-- pilih kategori --</option>
                                            <CategoryLomba />
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="instansi" value="Asal Politeknik" />
                                        </div>
                                        {/* <Select> */}
                                        {/* <option value="">--Pilih Asal Perguruan Tinggi</option> */}
                                        <ListPerguruangTinggi value={asalPoliteknik} onChange={(e) => { setAsalPoliteknik(e.target.value) }} className="select-rounded" />
                                        {/* </Select> */}
                                        {/* <TextInput
                                            id="instansi"
                                            type="text"
                                            value={asalPoliteknik}
                                            onChange={(e) => { setAsalPoliteknik(e.target.value) }}
                                            placeholder="Politeknik Negeri Padang"
                                            required
                                            className="form-control"
                                        /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-6 col-span-12">
                                <div className="flex  flex-col gap-4">
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="dosen" value="Dosen Pendamping" />
                                        </div>
                                        <TextInput
                                            onChange={(e) => { setDosenPendaming(e.target.value) }}
                                            id="dosen"
                                            type="text"
                                            value={dosenPendaming}
                                            placeholder="Fazrol Rozi, M,Sc"
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="nip_dosen" value="NIP Dosen" />
                                        </div>
                                        <TextInput
                                            onChange={(e) => { setNipDosen(e.target.value) }}
                                            id="nip_dosen"
                                            type="number"
                                            value={nipDosen}
                                            placeholder="888889978772138213"
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="proposal" value="Proposal" />
                                        </div>
                                        <FileInput
                                            id="proposal"
                                            required
                                            ref={fileInputRef}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) setProposal(file)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {teamMembers.map((member, index) => (
                        <TeamMemberForm key={index} index={index} member={member} handleInputChange={handleInputChange} refFile={fileInputRef} />
                    ))}
                    {/* {teamMembers.map((member, index) => (
                        <div key={index}>
                            <h5 className="card-title mt-7">Anggota Team {index + 1}</h5>
                            <div className="mt-4">
                                <div className="grid grid-cols-12 gap-30">
                                    <div className="lg:col-span-6 col-span-12">
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor={`nama_anggota_${index}`} value={`Nama Anggota ${index + 1}`} />
                                                </div>
                                                <TextInput
                                                    id={`nama_anggota_${index}`}
                                                    type="text"
                                                    placeholder="Nama Anggota"
                                                    required
                                                    value={member.nama_anggota}
                                                    onChange={(e) => handleInputChange(index, 'nama_anggota', e.target.value)}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor={`nim_${index}`} value="NIM" />
                                                </div>
                                                <TextInput
                                                    id={`nim_${index}`}
                                                    type="number"
                                                    placeholder="221108****"
                                                    required
                                                    value={member.nim}
                                                    onChange={(e) => handleInputChange(index, 'nim', e.target.value)}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor={`email_${index}`} value="Email" />
                                                </div>
                                                <TextInput
                                                    id={`email_${index}`}
                                                    type="email"
                                                    placeholder="email@example.com"
                                                    required
                                                    value={member.email}
                                                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-6 col-span-12">
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor={`no_wa_${index}`} value="No WA" />
                                                </div>
                                                <TextInput
                                                    id={`no_wa_${index}`}
                                                    type="tel"
                                                    placeholder="081234567890"
                                                    required
                                                    value={member.no_wa}
                                                    onChange={(e) => handleInputChange(index, 'no_wa', e.target.value)}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor={`prodi_${index}`} value="Program Studi" />
                                                </div>
                                                <TextInput
                                                    id={`prodi_${index}`}
                                                    type="text"
                                                    placeholder="Prodi"
                                                    required
                                                    value={member.prodi}
                                                    onChange={(e) => handleInputChange(index, 'prodi', e.target.value)}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor={`foto_ktm_${index}`} value="Foto KTM" />
                                                </div>
                                                <FileInput
                                                    id={`foto_ktm_${index}`}
                                                    accept="image/jpeg,png"
                                                    required
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) handleInputChange(index, 'foto_ktm', file)
                                                    }
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))} */}
                    <div className="col-span-12 mt-5 flex gap-3">
                        <Button className="bg-primary" type="submit" disabled={isLoading}>{isLoading ? "Proses..." : "Submit"}</Button>
                    </div>
                </form>

            </div>
        </>
    );
}