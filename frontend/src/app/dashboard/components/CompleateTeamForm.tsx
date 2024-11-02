'use client'

import apiClient from "@/utils/apiClient";
import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CategoryLomba from "./Category";
import ListPerguruangTinggi from "./ListPT";
import TeamMemberForm from "./TeamMemberForm";
import 'react-toastify/dist/ReactToastify.css';

export default function CompleateTeamForm() {
    const [teamName, setTeamName] = useState('');
    const [kategori, setKategori] = useState('');
    const [asalPoliteknik, setAsalPoliteknik] = useState('');
    const [dosenPendaming, setDosenPendaming] = useState('');
    const [nipDosen, setNipDosen] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
            setTeamMembers([...teamMembers]);
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to save team data."
            toast.error(errorMessage)
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <>
                <ToastContainer />
                <div className="rounded-sm border border-l-warning border-l-4 dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
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
                                            <ListPerguruangTinggi value={asalPoliteknik} onChange={(e) => { setAsalPoliteknik(e.target.value) }} className="select-rounded" />
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
                                    </div>
                                </div>
                            </div>
                        </div>

                        {teamMembers.map((member, index) => (
                            <TeamMemberForm key={index} index={index} member={member} handleInputChange={handleInputChange} refFile={fileInputRef} />
                        ))}
                        <div className="col-span-12 mt-5 flex gap-3">
                            <Button className="bg-primary" type="submit" disabled={isLoading}>{isLoading ? "Proses..." : "Submit"}</Button>
                        </div>
                    </form>

                </div>
            </>
        </div>
    );
}