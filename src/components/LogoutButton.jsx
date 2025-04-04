
import { useDispatch } from "react-redux";
import { logOut } from "../redux/slices/userSlice";
import CustomSvg from "./customSvg";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div
      onClick={handleLogout}
      className="flex items-center gap-[14px] w-[107px] h-[38px] bg-transparent mt-[24px] ml-[4px]  cursor-pointer"
    >
      {/* SVG-ul de logout */}
      <CustomSvg
          href={"/svg/symbol-defs.svg"}
          id={"icon-logout"}
          className={"size-7.5"}
        />
      <p className="text-[var(--color-logo)] font-semibold">Log out</p>
    </div>
  );
};

export default LogoutButton;
