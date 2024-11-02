
import NameUser from "@/app/components/dashboard/NameUser";
import LogoutButton from "./LogoutButton";
const Profile = () => {
  return (
    <div className="hidden sm:flex  justify-between items-center">
      <NameUser />
      <LogoutButton />
    </div>
  );
};

export default Profile;
