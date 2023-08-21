import { PropsWithChildren } from "react";
import classes from "./button.module.css";
type ButtonProps = PropsWithChildren & {
  onClick: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={classes.button}>
      {children}
    </button>
  );
}
