import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/selectors"; // Importăm selectorul pentru userData

const UserInfo = () => {
  // Accesăm datele utilizatorului din Redux
  const user = useSelector(selectUserData);

  return (
    <div className="flex items-center space-x-3 cursor-pointer">
      {/* Dacă avatarURL este disponibil, afișăm imaginea utilizatorului */}
      <img
        src={user.avatarURL || "/default-avatar.jpg"} // Dacă avatarURL este null, afișăm un avatar default
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      />
      <span className="font-medium">{user.name || "User"}</span> {/* Afișăm numele utilizatorului */}
    </div>
  );
};

export default UserInfo;
