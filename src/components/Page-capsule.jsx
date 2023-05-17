import styles from "../CSS/page-capsule.module.css";

export function PageCapsule({ children }) {
  return <div className={styles.page_capsule}>{children}</div>;
}
