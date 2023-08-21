import { PropsWithChildren } from "react";
import classes from "./list.module.css";

export default function List({ children }: PropsWithChildren) {
  return <ul className={classes.list}>{children}</ul>;
}
