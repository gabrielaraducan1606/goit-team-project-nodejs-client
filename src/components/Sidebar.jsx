// import React from "react";
// // import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// // import { logoutUser } from "../services/reduxServices";
// import { selectBoards } from "../redux/selectors";
// import LogoComponent from "./LogoComponent";
// import HelpSection from "./HelpSection";
// import LogoutButton from "./LogoutButton";

// const Sidebar = ({ onOpenCreateBoard }) => {
//   const boards = useSelector(selectBoards);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     dispatch(logoutUser());
// //     navigate("/");
// //   };

//   return (
//     <aside className="w-64 bg-[#121212] max-h-[770px] dark:bg-gray-900 p-4 flex flex-col h-full">
//       {/* Logo Component */}
//       <LogoComponent />
// <h3 className="text-sm font-semibold mb-0 mt-[60px] text-[12px] font-thin text-gray-600">My boards</h3>
// <div className="flex items-center justify-between w-[212px] h-[70px] mt-[8px] border-t border-b border-black/10">
//         {/* Text */}
//         <span className="font-poppins w-[76px] text-white text-[14px] font-medium">
//           Create a new board
//         </span>
//         <button className="w-[40px] h-[36px] bg-[#BEDBB0] rounded-md flex items-center justify-center"
//          onClick={onOpenCreateBoard}>
//             <span className="text-black text-[30px] font-thin">+</span>
//         </button>
//       </div>

//       {/* Lista de Dashboard-uri */}
//       <ul className="flex-1 max-h-[206px] overflow-y-auto">
//         {boards.map((board) => (
//           <li
//             key={board.id}
//             className="p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md flex justify-between"
//           >
//             <span>{board.title}</span>
//             <div className="flex space-x-2">
//               <button className="text-blue-500">✏️</button>
//               <button className="text-red-500">🗑️</button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Buton "Need Help" */}
//       <HelpSection />

//       {/* Buton Logout */}
//       <LogoutButton />
//     </aside>
//   );
// };

// export default Sidebar;

import React from "react";
import { useSelector } from "react-redux";
import { selectBoards } from "../redux/selectors";
import LogoComponent from "./LogoComponent";
import HelpSection from "./HelpSection";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ onOpenCreateBoard }) => {
  const boards = useSelector(selectBoards);

  return (
    <aside
      className="w-64 max-h-[770px] p-4 flex flex-col h-full"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      {/* Logo Component */}
      <LogoComponent />
      <h3 className="text-sm font-semibold mb-0 mt-[60px] text-[12px] font-thin text-gray-600">
        My boards
      </h3>
      <div className="flex items-center justify-between w-[212px] h-[70px] mt-[8px] border-t border-b border-black/10">
        {/* Text */}
        <span className="font-poppins w-[76px] text-white text-[14px] font-medium">
          Create a new board
        </span>
        <button
          className="w-[40px] h-[36px] bg-[#BEDBB0] rounded-md flex items-center justify-center"
          onClick={onOpenCreateBoard}
        >
          <span className="text-black text-[30px] font-thin">+</span>
        </button>
      </div>

      {/* Lista de Dashboard-uri */}
      <ul className="flex-1 max-h-[206px] overflow-y-auto">
        {boards.map((board) => (
          <li
            key={board.id}
            className="p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md flex justify-between"
          >
            <span>{board.title}</span>
            <div className="flex space-x-2">
              <button className="text-blue-500">✏️</button>
              <button className="text-red-500">🗑️</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Buton "Need Help" */}
      <HelpSection />

      {/* Buton Logout */}
      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
