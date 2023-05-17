import styles from "../CSS/container.module.css";

export function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}
