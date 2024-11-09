'use client'

import { faGroupArrowsRotate, faPeopleGroup, faUserGroup, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CountTeam({ team }: { team: [] }) {
    const countStatus = team.reduce(
        (acc: any, team: any) => {
            if (team.verified) {
                acc.verified += 1
            } else {
                acc.unverified += 1
            }
            return acc
        },
        { verified: 0, unverified: 0 }
    )
    return (
        <>
            <div className="border flex justify-between border-l-4 border-l-warning p-4 shadow-sm rounded-sm">
                <div>
                    <h3>Informasi Team</h3>
                    <p>Total team: {team.length}</p>
                    <p>Verified:  {countStatus.verified}</p>
                    <p>Unverified:  {countStatus.unverified}</p>
                </div>
                <div className="flex justify-center align-middle">
                    <FontAwesomeIcon
                        icon={faPeopleGroup}
                        className="font-bold text-5xl block mx-auto text-gray-500 leading-6 dark:text-opacity-60 hide-icon"
                    />
                </div>
            </div>
        </>
    );
}