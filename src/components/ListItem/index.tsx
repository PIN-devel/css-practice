import { PropsWithChildren } from "react";
import classes from "./listitem.module.css";

export default function ListItem({ children }: PropsWithChildren) {
  return <li className={classes["list-item"]}>{children}</li>;
}
