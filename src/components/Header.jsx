import { Link } from "react-router-dom";
import logo from "../assets/FINANÇAS.webp";
import styles from "../CSS/header.module.css";

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <h2>MyFinances.com</h2>
      </div>

      <nav id={styles.navbar}>
        <h2>
          <Link to="/">Home</Link>
        </h2>
        <h2>
          <Link to="/projetos">Projetos</Link>
        </h2>
        <h2>
          <Link to="/contato">Contato</Link>
        </h2>
        <h2>
          <Link to="/sobre">Sobre nós</Link>
        </h2>
      </nav>
    </div>
  );
}
