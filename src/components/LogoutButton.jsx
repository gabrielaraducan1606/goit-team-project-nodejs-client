import { useDispatch } from "react-redux";
import { loginUser } from "../services/reduxServices";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(loginUser({ email: "alex@email.com", password: "123123123" }));
  };

  return (
    <div
      onClick={handleLogout}
      className="flex items-center gap-[14px] w-[107px] h-[38px] bg-transparent mt-[24px] ml-[4px]  cursor-pointer"
    >
      {/* SVG-ul de logout */}
      <img src="/svg/logout.svg" alt="logout-symbol" />
      <p className="text-text font-semibold">Log out</p>
    </div>
  );
};

export default LogoutButton;
