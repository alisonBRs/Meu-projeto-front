import styles from "../CSS/btn.module.css";
import { Link } from "react-router-dom";

export function Button({ children }) {
  return (
    <>
      <Link className={styles.btn} to="/projeto">
        {children}
      </Link>
    </>
  );
}
