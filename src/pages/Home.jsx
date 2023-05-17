import styles from "../CSS/home.module.css";
import finances from "../assets/FINANÇAS.webp";
import { Button } from "../components/Button";

export function Home() {
  return (
    <div className={styles.home}>
      <img src={finances} alt="finanças" />
      <h1>MyFinances</h1>
      <Button>Criar projeto</Button>
    </div>
  );
}
