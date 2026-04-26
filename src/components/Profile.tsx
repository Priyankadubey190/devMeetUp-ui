import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import type { IUser } from "../redux/userSlice";

interface RootState {
  user: IUser | null;
}

const Profile: React.FC = () => {
  const user = useSelector((store: RootState) => store.user);

  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
