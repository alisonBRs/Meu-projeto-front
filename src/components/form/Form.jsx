import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../CSS/form.module.css";

export function Form() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [budget, setBudget] = useState(Number());

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("http://localhost:3030", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, budget }),
    });

    return navigate("/projetos");
  }

  return (
    <div className={styles.form_container}>
      <div className={styles.form_box}>
        <h1>Cadastro do projeto</h1>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={styles.form}
        >
          <label htmlFor="text">
            <p>Seu nome:</p>
            <input
              className={styles.input}
              required={true}
              id="text"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label htmlFor="number">
            <p>Custo inicial do projeto:</p>
            <input
              className={styles.input}
              required={true}
              id="number"
              type="number"
              onChange={(e) => setBudget(Number(e.target.value))}
            />
          </label>

          <div>
            <input
              className={styles.button}
              type="submit"
              value="Criar projeto"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
