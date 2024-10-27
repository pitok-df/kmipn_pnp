
import React from "react";
import NameUser from "@/app/components/dashboard/NameUser";
import LogoutButton from "./LogoutButton";
const Profile = () => {
  return (
    <div className="hidden sm:flex  justify-between items-center">
      <p className="text-black px-5">
        <NameUser />
      </p>
      <LogoutButton />
    </div>
  );
};

export default Profile;
