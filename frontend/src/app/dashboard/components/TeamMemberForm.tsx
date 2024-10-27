import { FileInput, Label, TextInput } from "flowbite-react";
import { MutableRefObject } from "react";

type TeamMemberProps = {
    index: number;
    member: any;
    handleInputChange: (index: number, field: "nama_anggota" | "nim" | "no_wa" | "email" | "prodi" | "foto_ktm", value: string | File) => void;
    refFile: MutableRefObject<null>
}

export default function TeamMemberForm({ index, member, handleInputChange, refFile }: TeamMemberProps) {
    return (
        <div key={index}>
            <h5 className="card-title mt-7">Anggota Team {index + 1} {index === 0 ? '(Ketua)' : ''}</h5>
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
                                    onChange={(e) => handleInputChange(index, "nama_anggota", e.target.value)}
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
                                    onChange={(e) => handleInputChange(index, "nim", e.target.value)}
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
                                    onChange={(e) => handleInputChange(index, "email", e.target.value)}
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
                                    onChange={(e) => handleInputChange(index, "no_wa", e.target.value)}
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
                                    onChange={(e) => handleInputChange(index, "prodi", e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor={`foto_ktm_${index}`} value="Foto KTM" />
                                </div>
                                <FileInput
                                    ref={refFile}
                                    id={`foto_ktm_${index}`}
                                    accept="image/jpeg,png"
                                    required
                                    onChange={(e) => handleInputChange(index, "foto_ktm", e.target.files?.[0] || '')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}