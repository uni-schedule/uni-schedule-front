import React from "react";
import Style from "./NavigationSidebar.module.css";
import { Link } from "@tanstack/react-router";

export interface NavigationSidebarItemProps {
  id: string | number;
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
  pathname?: string;
}

const NavigationSidebarItem: React.FC<NavigationSidebarItemProps> = ({
  text,
  icon,
  onClick,
  isSelected,
  pathname,
}) => {
  return (
    <>
      {pathname ? (
        <li onClick={onClick}>
          <Link
            to={pathname}
            className={[
              Style.navigationItem,
              isSelected ? Style.navigationItemActive : "",
            ].join(" ")}
          >
            <span className={Style.icon}>{icon ?? null}</span>
            {text}
          </Link>
        </li>
      ) : (
        <li>
          <button
            onClick={onClick}
            className={[
              Style.navigationItem,
              isSelected ? Style.navigationItemActive : "",
            ].join(" ")}
          >
            <span className={Style.icon}>{icon ?? null}</span>
            {text}
          </button>
        </li>
      )}
    </>
  );
};

export default NavigationSidebarItem;
