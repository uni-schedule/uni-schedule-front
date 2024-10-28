import React from 'react';
import style from './ErrorLabel.module.css'
import {FaCircleExclamation} from "react-icons/fa6";

interface ErrorLabelProps {
    text: string
    className?: string
}

const ErrorLabel:React.FC<ErrorLabelProps> = ({text, className}) => {
    return (
        <div className={[style.wrapper, className].join(' ')}>
            <FaCircleExclamation className={style.icon}/>
            <div className={style.textWrapper}>
                <p className={style.text}>{text}</p>
            </div>
        </div>
    );
};

export default ErrorLabel;