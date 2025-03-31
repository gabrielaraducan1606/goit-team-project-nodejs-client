const ThemedAvatar = ({ className }) => {
  //   const theme = document.documentElement.getAttribute("data-theme");
  //   let src;
  //   switch (theme) {
  //     case "light":
  //       src = light;
  //       break;
  //     case "dark":
  //       src = dark;
  //       break;
  //     case "violet":
  //       src = violet;
  //       break;
  //   }
  return (
    <picture>
      <img
        src="/public/images/user-light.png"
        alt="User Avatar"
        className={className}
      />
      <source
        srcSet="/public/images/user-dark.png"
        media="(prefers-color-scheme: dark)"
      />
      <source
        srcSet="/public/images/user-violet.png"
        media="(prefers-color-scheme: violet)"
      />
    </picture>
  );
};

export default ThemedAvatar;
