import { PropsWithChildren } from "react";
import classes from "./card.module.css";

export default function Card({ children }: PropsWithChildren) {
  return <div className={classes.card}>{children}</div>;
}
