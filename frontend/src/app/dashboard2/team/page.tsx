'use client'

import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";

export default function team() {
    const [teamName, setTeamName] = useState('');
    const [kategori, setKategori] = useState('');
    const [asalPoliteknik, setAsalPoliteknik] = useState('');
    const [dosenPendaming, setDosenPendaming] = useState('');
    const [nipDosen, setNipDosen] = useState('');
    const [proposal, setProposal] = useState(null);

    const [teamMembers, setTeamMembers] = useState([
        { nama_anggota: '', nim: '', no_wa: '', email: '', prodi: '', foto_ktm: null },
        { nama_anggota: '', nim: '', no_wa: '', email: '', prodi: '', foto_ktm: null },
        { nama_anggota: '', nim: '', no_wa: '', email: '', prodi: '', foto_ktm: null }
    ]);

    const handleInputChange = (index, field, value) => {
        const newTeamMembers = [...teamMembers];
        newTeamMembers[index][field] = value;
        setTeamMembers(newTeamMembers);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Data Tim:', teamMembers);
        console.log('file proposal: ', proposal)
    };

    return (
        <>
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
                                            onChange={(e) => { setTeamName(e.target.value) }}
                                            type="text"
                                            placeholder="Nama Tim"
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="kategori" value="Kategori Lomba" />
                                        </div>
                                        <Select id="kategori" onChange={(e) => { setKategori(e.target.value) }} required className="select-rounded">
                                            <option>Game</option>
                                            <option>IOT</option>
                                            <option>Proposal</option>
                                            <option>Cipta Inovasi</option>
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="instansi" value="Asal Politeknik" />
                                        </div>
                                        <TextInput
                                            id="instansi"
                                            type="text"
                                            onChange={(e) => { setAsalPoliteknik(e.target.value) }}
                                            placeholder="Politeknik Negeri Padang"
                                            required
                                            className="form-control"
                                        />
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
                                            onChange={(e) => { setProposal(e.target.files[0]) }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {teamMembers.map((member, index) => (
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
                                                    onChange={(e) => handleInputChange(index, 'foto_ktm', e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-span-12 mt-5 flex gap-3">
                        <Button className="bg-primary" type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </>
    );
}