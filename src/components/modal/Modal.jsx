import { useEffect, useState } from "react";
import styles from "../../CSS/modal.module.css";
import { RiCloseCircleLine } from "react-icons/ri";

export function Modal({ isValid, userId, id }) {
  const [toggle, setToggle] = useState(false);

  const [name, setName] = useState();
  const [cost, setCost] = useState(Number());
  const [description, setDescription] = useState();

  function Send() {
    setToggle(!toggle);

    fetch(`http://localhost:3030/service/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, cost, description }),
    });

    name("");
    cost("");
    description("");
  }

  useEffect(() => {
    setToggle(!toggle);
  }, [isValid]);

  const closePopPup = () => {
    isValid = true;
    setToggle(!toggle);
  };

  return (
    <div
      className={toggle ? styles.Modal_container_off : styles.Modal_container}
    >
      <div className={styles.Modal}>
        <h2>Adicione um serviço para: {userId}</h2>

        <div className={styles.input_container}>
          <div className={styles.input}>
            <label htmlFor="name">
              <p>nome do serviço: </p>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
              />
            </label>

            <label htmlFor="cost">
              <p>custo: </p>
              <input
                onChange={(e) => setCost(Number(e.target.value))}
                type="number"
                id="cost"
              />
            </label>

            <label htmlFor="description">
              <p>descrição: </p>
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                id="description"
              />
            </label>
          </div>
        </div>

        <button className={styles.btn} onClick={Send}>
          Criar serviço
        </button>

        <div className={styles.close} onClick={closePopPup}>
          <RiCloseCircleLine />
        </div>
      </div>
    </div>
  );
}
