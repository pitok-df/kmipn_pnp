// 'use client'

// import Table from "@/utils/TablePaginition";
// import { AllTeamDataType } from "@/utils/types";
// import DetailTeam from "./detailTeam";
// import { useState } from "react";

// export default function AllTeamTable({ data }: { data: AllTeamDataType[] }) {
//     const [detailOpen, setDetailOpen] = useState(false);
//     const [teamData, setTeamData] = useState(null);

//     const handleDetailModal = (data: any) => {
//         setDetailOpen(!detailOpen);
//         setTeamData(data)
//     }

//     const closeDetailModal = () => {
//         setDetailOpen(!detailOpen);
//         setTeamData(null)
//     }

//     return (
//         <>
//             {
//                 detailOpen && teamData && (
//                     <DetailTeam onClose={closeDetailModal} data={teamData} />
//                 )
//             }
//             <Table
//                 data={data}
//                 columns={["teamName", "categori", "lectureName"]}
//                 headers={["#", "teamName", "categori", "lectureName"]}
//                 onDetail={handleDetailModal} />
//         </>
//     );
// }