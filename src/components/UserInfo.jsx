import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/selectors";

const UserInfo = () => {
  // Accesăm datele utilizatorului din Redux
  const user = useSelector(selectUserData);

  return (
    <div className="flex items-center space-x-3 cursor-pointer">
      {/* Dacă avatarURL este disponibil, afișăm imaginea utilizatorului */}
      <span className="font-medium">{user.name || "User"}</span> {/* Afișăm numele utilizatorului */}
      <img
        src={user.avatarURL || "/default-avatar.jpg"} // Dacă avatarURL este null, afișăm un avatar default
        alt="User Avatar"
        className="size-10 rounded-full"
      />
    </div>
  );
};

export default UserInfo;
