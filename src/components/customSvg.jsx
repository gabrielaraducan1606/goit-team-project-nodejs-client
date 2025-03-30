import React from "react";

const CustomSvg = ({ href, id, className }) => {
  return (
    <svg className={className}>
      <use href={`${href}#${id}`}></use>
    </svg>
  );
};

export default CustomSvg;
