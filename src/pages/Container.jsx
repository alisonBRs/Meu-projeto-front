import styles from "../CSS/container.module.css";
import { Outlet } from "react-router-dom";
import { Message } from "../components/message/message";

export function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}
