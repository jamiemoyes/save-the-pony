import { ButtonHTMLAttributes } from "react";
import classes from "./ControlButton.module.css";

const ControlButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return <button className={classes.controlButton} {...props} />;
};

export default ControlButton;
