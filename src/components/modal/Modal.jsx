import { useEffect, useState } from "react";
import styles from "../../CSS/modal.module.css";
import { RiCloseCircleLine } from "react-icons/ri";
import { ModalBox } from "../modal/ModalBox";

export function Modal({
  isValid,
  userId,
  postService,
  alternateModal,
  services,
  servicesId,
  budget,
  costs,
  projects,
  projectId,
}) {
  const [toggle, setToggle] = useState(false);

  const [name, setName] = useState();
  const [cost, setCost] = useState(Number());
  const [description, setDescription] = useState();

  useEffect(() => {
    setToggle(!toggle);
  }, [isValid]);

  function postDataService(e) {
    e.preventDefault();
    postService(name, cost, description);
  }

  const closePopPup = () => {
    setToggle(!toggle);
  };

  const deleteService = (id) => {
    servicesId(id, projectId);
  };

  return (
    <div
      className={toggle ? styles.modal_container_off : styles.modal_container}
    >
      <div className={styles.modal}>
        {alternateModal ? (
          <form autoComplete="off" className={styles.add_service_container}>
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
          </form>
        ) : (
          <>
            <div className={styles.title}>
              <h2>
                Todos os serviços de: {userId}
                <span className={styles.total_services}>{projects.length}</span>
              </h2>
              <p>
                R${costs?.toLocaleString("pt-br")} / R$
                {budget?.toLocaleString("pt-br")}
              </p>
            </div>
            <div className={styles.services_container}>
              {services.map((service) => (
                <div className={styles.services} key={service.id}>
                  <ModalBox
                    service={service}
                    styles={styles}
                    serviceId={deleteService}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <div className={styles.close} onClick={closePopPup}>
          <RiCloseCircleLine />
        </div>
      </div>
    </div>
  );
}
