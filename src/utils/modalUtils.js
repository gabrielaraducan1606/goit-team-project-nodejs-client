export const openModal = (navigate, type, data = null) => {
  const params = new URLSearchParams(window.location.search);
  params.set("modal", type);

  if (data) {
    params.set("data", encodeURIComponent(JSON.stringify(data)));
  }

  // Păstrați pathname-ul curent și adăugați/modificați parametrii de modal
  const currentPath = window.location.pathname;
  navigate(`${currentPath}?${params.toString()}`);
};
