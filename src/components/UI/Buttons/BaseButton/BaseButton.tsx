import React, { forwardRef } from "react";
import Loader from "../../Loader/Loader";
import Styles from "./BaseButton.module.css";

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ children, disabled, onClick, isLoading, icon, className }, ref) => {
    return (
      <button
        ref={ref}
        className={[Styles.baseButton, className].join(" ")}
        disabled={disabled}
        onClick={onClick}
      >
        {isLoading && (
          <div className={Styles.loaderWrapper}>
            <Loader color="white" />
          </div>
        )}
        {icon}
        <div
          className={
            isLoading ? Styles.contentWrapperHidden : Styles.contentWrapper
          }
        >
          {children}
        </div>
      </button>
    );
  },
);

export default BaseButton;
