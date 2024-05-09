import { useCallback } from "react";
import classes from "./ModalBase.module.scss";
import { Modal, ModalProps } from "@mui/material";

type ModalBaseProps = {
  childrenClassName?: string;
} & ModalProps;

export const ModalBase = ({ ...props }: ModalBaseProps) => {
  const handleClose = useCallback(() => {
    props.onClose && props.onClose({}, "backdropClick");
  }, [props.onClose]);

  return (
    <Modal className={classes.modal} {...props}>
      <div className={classes.modal_wrapper}>
        <div className={classes.modal_header}>
          <span className={classes.close} onClick={handleClose}>
            X
          </span>
          {props.title && <h3 className={classes.title}>{props.title}</h3>}
        </div>
        <div
          className={`${classes.modal_content} ${
            props.childrenClassName || ""
          }`}
        >
          {props.children}
        </div>
      </div>
    </Modal>
  );
};
