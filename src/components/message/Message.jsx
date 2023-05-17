import { useEffect } from "react";
import styles from "../../CSS/message.module.css";

export function Message({ msg, showToast }) {
  useEffect(() => {
    if (!msg) {
      return;
    }

    showToast(true);

    const timer = setTimeout(() => showToast(false), 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {showToast && (
        <div className={styles.message_container}>
          <p>{msg}</p>
        </div>
      )}
    </>
  );
}
