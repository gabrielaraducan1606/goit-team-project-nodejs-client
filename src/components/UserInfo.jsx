import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/selectors";
import BackupModal from "./backupModal";
import ThemedAvatar from "./themedAvatar";
// import lightImage from '/images/user-light.png'

const UserInfo = () => {
  const user = useSelector(selectUserData);
  const [open] = useState(false);

  return (
    <div className="flex items-center space-x-3 cursor-pointer">
      <span className="font-medium">{user.name || "User"}</span>{" "}
      {user.avatarURL ? (
        <img
          src="/images/avatar.png"
          alt="User Avatar"
          className="size-10 rounded-full"
        />
      ) : (
        <ThemedAvatar
          light="./images/user-light.png"
          dark="./images/user-dark.png"
          violet="./images/user-violet.png"
        />
      )}
      <BackupModal open={open}></BackupModal>
    </div>
  );
};

export default UserInfo;
