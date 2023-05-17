import styles from "../CSS/footer.module.css";
import logo from "../assets/FINANÇAS.webp";

export function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>
        <img src={logo} alt="logo" />

        <h2>
          My<span>Finances</span>
          <span>&copy;</span>
        </h2>
      </div>

      <p>todos os direitos reservados.</p>
    </div>
  );
}
