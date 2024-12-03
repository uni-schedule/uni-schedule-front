import React from "react";
import Style from "./AppWrapper.module.css";

const AppWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={[Style.appWrapper].join(" ")}>{children}</div>;
};

export default AppWrapper;
