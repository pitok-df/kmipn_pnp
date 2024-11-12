import { AllTeamDataType, teamMemberType } from "@/utils/types";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Button, Modal, ModalBody } from "flowbite-react";
import { uniqueId } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DetailTeam({ data }: { data: teamMemberType }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmModal, setConfirmModal] = useState(false);
    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    const handleModalConfirm = () => {
        setConfirmModal(!isConfirmModal)
    }

    const verifyTeam = async () => {
        try {
            setIsLoading(true)
            const response = await axios.put(`/api/v1/team-member/${data.id}`);
            if (response.status === 200) {
                toast.success(response.data.msg)
                router.refresh()
            }
        } catch (error: any) {
            if (error.status === 400) {
                toast.error(error.response.data.msg)
            }
        } finally { setIsLoading(false) }
    }
    return (
        <>
            <Button as={Link} href='#' onClick={handleModal} className="w-max" color={'success'} size={'sm'}>
                <FontAwesomeIcon icon={faInfoCircle} />
            </Button>
            <Modal show={isOpen} onClose={handleModal} className="w-full">
                <Modal.Header>
                    Detail Team - {data.verified ? 'Sudah diverifikasi' : 'Belum diverifikasi'}
                </Modal.Header>
                <ModalBody>
                    {/* <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Informasi Tim</h3>
                        <p className="text-sm text-gray-600"><span className="font-semibold">Nama Team:</span> {data.teamName}</p>
                        <p className="text-sm text-gray-600"><span className="font-semibold">Kategori:</span> {data.categori}</p>
                        <p className="text-sm text-gray-600"><span className="font-semibold">Politeknik:</span> {data.institution}</p>
                        <p className="text-sm text-gray-600"><span className="font-semibold">Nama Dosen:</span> {data.lectureName}</p>
                        <p className="text-sm text-gray-600"><span className="font-semibold">Proposal:</span> <a href={data.linkProposal} className="text-blue-500 underline">Lihat Proposal</a></p>
                    </div> */}
                    <table className="mb-5 grid">
                        <thead>
                            <tr>
                                <td><h3 className="font-bold me-3">Nama Team</h3></td>
                                <td><h3 className=" font-normal">: {data.teamName} </h3></td>
                            </tr>
                            <tr>
                                <td><h3 className="font-bold me-3">Kategori</h3></td>
                                <td><h3 className=" font-normal">: {data.categori} </h3></td>
                            </tr>
                            <tr>
                                <td><h3 className="font-bold me-3">Politeknik</h3></td>
                                <td><h3 className=" font-normal">: {data.institution} </h3></td>
                            </tr>
                            <tr>
                                <td><h3 className="font-bold me-3">Nama Dosen</h3></td>
                                <td><h3 className=" font-normal">: {`${data.lectureName} (${data.lectureNip})`} </h3></td>
                            </tr>
                            <tr>
                                <td><h3 className="font-bold me-3">Proposal</h3></td>
                                <td><h3 className=" font-normal">: {data.linkProposal ? <Link className="text-blue-500" target="_blank" href={data.linkProposal}>Lihat Proposal</Link> : "Belum upload"} </h3></td>
                            </tr>
                        </thead>
                    </table>
                    <h2 className="mb-3 border-b-2 border-gray-200 text-lg">Informasi Member</h2>
                    <div className="flex flex-col gap-3">
                        {
                            data.teamMembers.map((member, index) =>
                                <div className="flex gap-3 border-b-2 mb-2" key={uniqueId()}>
                                    <div className="mb-3">
                                        <Image src={member.fileKTM} loading="lazy" className="w-56 h-36 rounded-sm border border-gray-300 object-cover" alt="foto ktm" width={200} height={100}></Image>
                                    </div>
                                    <table className="mb-3">
                                        <thead>
                                            <tr key={uniqueId()}>
                                                <td><h3>Nama</h3></td>
                                                <td><p className="text-gray-600 text-[.9rem] font-medium">: {member.name} {member.role === 'leader' ? "(Ketua)" : ""}</p></td>
                                            </tr>
                                            <tr key={uniqueId()}>
                                                <td><h3 className=" font-bold me-3">NIM</h3></td>
                                                <td><p className="text-gray-600 text-[.9rem] font-medium">: {member.nim} </p></td>
                                            </tr>
                                            <tr key={uniqueId()}>
                                                <td>
                                                    <h3 className=" font-bold me-3">Prodi</h3>
                                                </td>
                                                <td><p className="text-gray-600 text-[.9rem] font-medium">: {member.prodi} </p></td>
                                            </tr >
                                            <tr key={uniqueId()}>
                                                <td><h3 className=" font-bold me-3">Email</h3></td>
                                                <td><p className="text-gray-600 text-[.9rem] font-medium">: {member.email} </p></td>
                                            </tr>
                                            <tr key={uniqueId()}>
                                                <td><h3 className=" font-bold me-3">No WA</h3></td>
                                                <td><p className="text-gray-600 text-[.9rem] font-medium">: {member.noWA} </p></td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            )
                        }
                    </div>
                </ModalBody>
                {
                    data.verified ?
                        ''
                        :
                        <Modal.Footer className="flex justify-end">
                            <Button as={'button'} color={'primary'} onClick={handleModalConfirm} className="w-max">Verify</Button>
                        </Modal.Footer>
                }
            </Modal>

            <Modal show={isConfirmModal} size={'md'} onClose={handleModal} className="bg-white shadow dark:bg-gray-700">
                <Modal.Body>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to verify <strong>{data.teamName}</strong> team?</h3>
                        <div className="flex justify-center gap-3">
                            <Button color={'primary'} type="button" onClick={verifyTeam} disabled={isLoading}>
                                {isLoading ? "Verifing..." : "Verify"}
                            </Button>
                            <Button onClick={handleModalConfirm} type="button" color={'error'}>Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}