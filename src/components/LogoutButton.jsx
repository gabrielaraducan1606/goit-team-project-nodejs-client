//import { useHistory } from "react-router-dom"; // pentru redirecționare
// import { useDispatch } from "react-redux"; // pentru a trimite acțiuni Redux
//import { logoutUser } from "./redux/actions"; // Importă acțiunea de logout

const LogoutButton = () => {
  // const history = useHistory();
  // const dispatch = useDispatch();

  // Funcția care se ocupă de logout
  const handleLogout = () => {
    // Șterge token-ul de autentificare din localStorage
    localStorage.removeItem("token");

    // Dacă folosești Redux pentru starea utilizatorului
    // dispatch(logoutUser());

    // Redirecționează utilizatorul către pagina WelcomePage
    history.push("/welcome");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex gap-[14px] p-[0px] w-[105px] h-[38px] bg-transparent rounded-md mt-[24px] ml-[4px] text-white"
    >
      {/* SVG-ul de logout */}
      <img src="/public/svg/logout.svg" alt="logout-symbol"/>
      <span className="font-poppins ">Log out</span>
    </button>
  );
};

export default LogoutButton;
