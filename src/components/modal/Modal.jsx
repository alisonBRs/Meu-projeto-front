import { useEffect, useState } from "react";
import styles from "../../CSS/modal.module.css";
import { RiCloseCircleLine } from "react-icons/ri";

export function Modal({
  isValid,
  userId,
  postService,
  alternateModal,
  services,
}) {
  const [toggle, setToggle] = useState(false);

  const [name, setName] = useState();
  const [cost, setCost] = useState(Number());
  const [description, setDescription] = useState();

  useEffect(() => {
    setToggle(!toggle);
  }, [isValid]);

  function postDataService() {
    postService(name, cost, description);
  }

  const closePopPup = () => {
    setToggle(!toggle);
  };

  return (
    <div
      className={toggle ? styles.modal_container_off : styles.modal_container}
    >
      <div className={styles.modal}>
        {alternateModal ? (
          <div className={styles.add_service_container}>
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
            <button className={styles.btn} onClick={postDataService}>
              Criar serviço
            </button>
          </div>
        ) : (
          <div className={styles.services_container}>
            <h2>Todos os serviços de: {userId}</h2>
            {services.map((service) => (
              <div className={styles.services} key={service.id}>
                <p>{service.name}</p>
                <p>{service.cost}</p>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className={styles.close} onClick={closePopPup}>
          <RiCloseCircleLine />
        </div>
      </div>
    </div>
  );
}
