import React, { forwardRef } from "react";
import Styles from "./BaseButton.module.css";
import Loader from "../../Loader/Loader";

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ children, disabled, onClick, isLoading, icon }, ref) => {
    return (
      <button
        ref={ref}
        className={Styles.baseButton}
        disabled={disabled}
        onClick={onClick}
      >
        {isLoading && (
          <div className={Styles.loaderWrapper}>
            <Loader />
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
