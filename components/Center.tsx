import React from "react";

export const Center = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-center flex flex-col items-center">{children}</div>;
};
