const LogoutButton = () => {

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    history.push("/welcome");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex gap-[14px] p-[0px] w-[107px] h-[38px] bg-transparent mt-[24px] ml-[4px] text-title"
    >
      {/* SVG-ul de logout */}
      <img src="/svg/logout.svg" alt="logout-symbol"/>
      <span className="font-poppins">Log out</span>
    </button>
  );
};

export default LogoutButton;
