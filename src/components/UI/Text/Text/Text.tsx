import React from 'react';
import Styles from './Text.module.css';

interface TextProps {
    children?: React.ReactNode
    align?: "left" | "center" | "right"
    size?: "small" | "medium" | "large"
    weight?: "light" | "normal" | "bold"
    span?: boolean
    pointer?: boolean
    accent?: boolean

    className?: string
}

const Text:React.FC<TextProps> = ({children, align = "left", size = "medium", weight = "normal", className, accent, pointer, span = false}) => {
    const fontSize = {
        small: "0.8rem",
        medium: "1rem",
        large: "1.2rem",
    }
    const style = {
        textAlign: align,
        fontWeight: weight,
        fontSize: fontSize[size],
        cursor: pointer ? "pointer" : "default",
    }
    const classNames = [Styles.text, className, accent && Styles.textAccent].join(" ")

    return (
        span ? <span className={classNames} style={style}>{children}</span> : <p className={classNames} style={style}>{children}</p>
    );
};

export default Text;