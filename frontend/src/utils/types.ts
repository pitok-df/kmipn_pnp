export interface teamMemberType {
    teamName: string,
    categori: string,
    institution: string,
    lectureName: string,
    lectureNip: string,
    linkProposal: string,
    statusProposal: string,
    statusSubmission: string,
    round: string,
    verified: boolean,
    teamMembers: [
        {
            name: string,
            nim: string,
            email: string,
            noWa: string,
            prodi: string,
            fileKTM: string
        }
    ]
}

export type userType = {
    id?: string,
    name: string,
    email: string,
    verified: boolean,
    role: string
}