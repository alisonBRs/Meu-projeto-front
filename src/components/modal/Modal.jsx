import { useEffect, useState } from "react";
import styles from "../../CSS/modal.module.css";
import { RiCloseCircleLine } from "react-icons/ri";

export function Modal({ isValid, userId, name, cost, description }) {
  const [toggle, setToggle] = useState(false);
  const [sendName, setSendName] = useState();
  const [sendCost, setSendCost] = useState();
  const [sendDescription, setSendDescription] = useState();

  function Send() {
    setToggle(!toggle);
    name = sendName;
    cost = sendCost;
    description = sendDescription;

    return console.log(sendName, sendCost, sendDescription);
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
        <h2>Adicionar serviços para: {userId}</h2>

        <div className={styles.input}>
          <label htmlFor="name">
            <span>nome do item: </span>
            <input
              onChange={(e) => setSendName(e.target.value)}
              type="text"
              id="name"
            />
          </label>

          <label htmlFor="cost">
            <span>custo: </span>
            <input
              onChange={(e) => setSendCost(e.target.value)}
              type="number"
              id="cost"
            />
          </label>

          <label htmlFor="description">
            <span>descrição: </span>
            <input
              onChange={(e) => setSendDescription(e.target.value)}
              type="text"
              id="description"
            />
          </label>
        </div>

        <button onClick={Send}>Criar serviço</button>

        <div className={styles.close} onClick={closePopPup}>
          <RiCloseCircleLine />
        </div>
      </div>
    </div>
  );
}
