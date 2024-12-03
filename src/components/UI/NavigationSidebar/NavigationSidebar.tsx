import React from "react";
import Style from "./NavigationSidebar.module.css";
import NavigationSidebarItem from "./NavigationSidebarItem.tsx";

export interface INavigationSidebarItem {
  id: string | number;
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  pathname?: string;
  always?: boolean;
}

interface NavigationSidebarProps {
  items: INavigationSidebarItem[];
  selectedId: string | number | null;
  onChange?: (id: string | number) => void;
  onClick?: () => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  items,
  selectedId,
  onClick,
}) => {
  const handleClick = (fn?: () => void) => {
    if (fn) {
      fn();
    }
    onClick ? onClick() : null;
  };

  return (
    <nav id="nav" data-show="0" className={Style.navigation}>
      <ul className={Style.navigationItems}>
        {items.map((item, index) => (
          <NavigationSidebarItem
            key={index}
            {...item}
            onClick={() => handleClick(item.onClick)}
            isSelected={item.id === selectedId}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavigationSidebar;
