import React from "react";
import { twMerge } from "tailwind-merge";

type BoxProps = {
  children?: React.ReactNode;
  classname?: string;
};

const Box = ({ children, classname }: BoxProps) => {
  return (
    <div
      className={twMerge(`bg-neutral-900 rounded-lg w-full h-fit`, classname)}
    >
      {children}
    </div>
  );
};

export default Box;
