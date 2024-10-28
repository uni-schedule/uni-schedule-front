import React from 'react';
import Styles from './BasePanel.module.css'

interface BasePanelProps {
    className?: string
    children?: React.ReactNode
}

const BasePanel:React.FC<BasePanelProps> = ({children, className}) => {
    return (
        <div className={[Styles.basePanel, className].join(' ')}>
            {children}
        </div>
    );
};

export default BasePanel