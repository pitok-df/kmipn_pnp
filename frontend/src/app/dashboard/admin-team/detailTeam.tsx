import { AllTeamDataType } from "@/utils/types";
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

export default function DetailTeam({ data }: { data: AllTeamDataType }) {
    const [isOpen, setIsOpen] = useState(false);
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
            const response = await axios.put(`/api/v1/team-member/${data.id}`);
            if (response.status === 200) {
                toast.success(response.data.msg)
                router.refresh()
            }
        } catch (error: any) {
            if (error.status === 400) {
                toast.error(error.response.data.msg)
            }
        }
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
                    <table className="mb-5 grid">
                        <thead>
                            <tr>
                                <td><p className="text-gray-800 text-[.98rem] font-bold me-3">Nama Team</p></td>
                                <td><p className="text-gray-600 text-[.98rem] font-medium">: {data.teamName} </p></td>
                            </tr>
                            <tr>
                                <td><p className="text-gray-800 text-[.98rem] font-bold me-3">Kategori</p></td>
                                <td><p className="text-gray-600 text-[.98rem] font-medium">: {data.categori} </p></td>
                            </tr>
                            <tr>
                                <td><p className="text-gray-800 text-[.98rem] font-bold me-3">Politeknik</p></td>
                                <td><p className="text-gray-600 text-[.98rem] font-medium">: {data.institution} </p></td>
                            </tr>
                            <tr>
                                <td><p className="text-gray-800 text-[.98rem] font-bold me-3">Nama Dosen</p></td>
                                <td><p className="text-gray-600 text-[.98rem] font-medium">: {`${data.lectureName} (${data.lectureNip})`} </p></td>
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
                                                <td><p className="text-gray-800 text-[.9rem] font-bold me-3">Nama</p></td>
                                                <td><p className="text-gray-600 text-[.9rem] font-medium">: {member.name} </p></td>
                                            </tr>
                                            <tr key={uniqueId()}>
                                                <td><p className="text-gray-800 text-[.9rem] font-bold me-3">NIM</p></td>
                                                <td><p className="text-gray-600 text-[.9rem] font-medium">: {member.nim} </p></td>
                                            </tr>
                                            <tr key={uniqueId()}>
                                                <td><p className="text-gray-800 text-[.9rem] font-bold me-3">Prodi</p></td>
                                                <td><p className="text-gray-600 text-[.9rem] font-medium">: {member.prodi} </p></td>
                                            </tr >
                                            <tr key={uniqueId()}>
                                                <td><p className="text-gray-800 text-[.9rem] font-bold me-3">Email</p></td>
                                                <td><p className="text-gray-600 text-[.9rem] font-medium">: {member.email} </p></td>
                                            </tr>
                                            <tr key={uniqueId()}>
                                                <td><p className="text-gray-800 text-[.9rem] font-bold me-3">No WA</p></td>
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
                        <button type="button" onClick={verifyTeam} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-700 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Verify
                        </button>
                        <button onClick={handleModalConfirm} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}