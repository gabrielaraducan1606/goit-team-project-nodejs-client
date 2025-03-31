import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/selectors";
import BackupModal from "./backupModal";
import ThemedAvatar from "./themedAvatar";

const UserInfo = () => {
  // Accesăm datele utilizatorului din Redux
  const user = useSelector(selectUserData);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center space-x-3 cursor-pointer">
      {/* Dacă avatarURL este disponibil, afișăm imaginea utilizatorului */}
      <span className="font-medium">{user.name || "User"}</span>{" "}
      {/* Afișăm numele utilizatorului */}
      {user.avatarURL ? (
        <img
          src={user.avatarURL} // Dacă avatarURL este null, afișăm un avatar default
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
