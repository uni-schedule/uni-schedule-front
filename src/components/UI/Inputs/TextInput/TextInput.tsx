import React, { ComponentProps, forwardRef } from "react";
import Styles from "./TextInput.module.css";

interface TextInputProps extends ComponentProps<"input"> {
  className?: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
}

const TextInput: React.FC<TextInputProps> = forwardRef(
  (
    { className, label, type = "text", placeholder, errorMessage, ...props },
    ref,
  ) => {
    return (
      <div className={[Styles.textInputWrapper, className].join(" ")}>
        <label>
          {label && <span className={Styles.textInputLabel}>{label}</span>}
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={Styles.textInput}
            aria-errormessage={errorMessage}
            aria-invalid={!!errorMessage}
            {...props}
          />
          {errorMessage ? (
            <span className={Styles.errorMessage}>{errorMessage}</span>
          ) : null}
        </label>
      </div>
    );
  },
);

export default TextInput;
