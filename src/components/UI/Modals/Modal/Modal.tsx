import { FC, ReactNode } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import styles from "./Modal.module.css";
import { FaXmark } from "react-icons/fa6";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
}) => {
  return (
    <Dialog as="div" className={styles.dialog} open={isOpen} onClose={onClose}>
      <DialogBackdrop className={styles.backdrop} />
      <div className={styles.panelWrapper}>
        <DialogPanel className={[styles.panel, className].join(" ")}>
          <div className={styles.header}>
            {title ? (
              <DialogTitle className={styles.title}>{title}</DialogTitle>
            ) : null}
            <button className={styles.closeButton} onClick={onClose}>
              <FaXmark />
            </button>
          </div>

          <div className={styles.contentWrapper}>{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
