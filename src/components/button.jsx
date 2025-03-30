import React from "react";
import { cn } from "../utils/cn";
import { tv } from "tailwind-variants";

const buttonStyles = tv({
  base: " rounded-lg cursor-pointer text-sm",
  variants: {
    variant: {
      primary:
        "bg-primary hover:bg-secondary text-btn-text w-full h-[3.125rem] flex items-center justify-center font-semibold",
      secondary:
        "bg-card-bg hover:bg-secondary text-title w-[21rem] h-[3.125rem] flex items-center justify-center font-semibold",
      auth: "bg-[#BEDBB0] hover:bg-[#9DC888] text-[#161616] w-full h-[3.125rem] flex items-center justify-center font-semibold",
      icon: "bg-transparent w-fit h-fit p-0 m-0",
      small:
        "bg-small-btn-primary hover:bg-small-btn-secondary text-btn-text w-[2.5rem ] h-[2.25rem] aspect-[1/1] flex items-center justify-center font-semibold",
    },
    defaultVariants: {
      variant: "primary",
    },
  },
});

const Button = ({ children, variant, icon, className, ...props }) => {
  return (
    <button className={cn(buttonStyles({ variant, className }))} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;

// usage example
// Use like a normal button but instead of className use one of the predefined variants found below
// you can pass it an icon as a prop and it will be displayed before the text
// if you do not pass any text only the icon will be displayed
// if you need additional styles use the className prop
// <Button variant="primary" onClick={handleClick}>

/** Button variants:
 * primary- most used button,
 * secondry-for adding columns,
 * auth-for the auth forms(different from the rest because it dissrigards the theme)
 * small for the small square buttons
 * icon it holds the icon imgage (edit, delete, move)  */
