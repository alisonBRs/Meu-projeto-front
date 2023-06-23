import { useEffect, useState } from "react";
import styles from "../../CSS/modal.module.css";
import { RiCloseCircleLine } from "react-icons/ri";
import { ModalBox } from "../modal/ModalBox";

export function Modal({
  isValid,
  userName,
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
  const [cost, setCost] = useState();
  const [description, setDescription] = useState();

  const [projectCost, setProjectCost] = useState();
  const [serviceCost, setServiceCost] = useState();

  useEffect(() => {
    setToggle(!toggle);
  }, [isValid]);

  const reloadChanges = async () => {
    try {
      const data = await fetch("`http://localhost:3030", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    reloadChanges();
  }, []);

  function postDataService(e) {
    e.preventDefault();
    postService(name, cost, description);

    setName("");
    setCost("");
    setDescription("");
  }

  const closePopPup = () => {
    setToggle(!toggle);
  };

  const deleteService = (id) => {
    servicesId(id, projectId);
  };

  const costsResponse = async (serviceId) => {
    try {
      const data = await fetch(`http://localhost:3030/${projectId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const dataJson = await data.json();
      setProjectCost(dataJson.cost);
    } catch (err) {
      console.error(err);
    }

    try {
      const data = await fetch(
        `http://localhost:3030/service/${projectId}/${serviceId}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const dataJson = await data.json();
      setServiceCost(dataJson[0].cost);
    } catch (err) {
      console.error(err);
    }
  };

  const serviceResponse = async (id, name, cost, description) => {
    const sum = projectCost - serviceCost + Number(cost);

    await fetch(`http://localhost:3030/${projectId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ cost: sum }),
    });

    await fetch(`http://localhost:3030/service/${projectId}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, cost, description }),
    });
  };

  return (
    <div
      className={toggle ? styles.modal_container_off : styles.modal_container}
    >
      <div className={styles.modal}>
        {alternateModal ? (
          <form autoComplete="off" className={styles.add_service_container}>
            <h2>Adicione um serviço para: {userName}</h2>

            <div className={styles.input_container}>
              <div className={styles.input}>
                <label htmlFor="name">
                  <p>nome do serviço: </p>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    value={name}
                  />
                </label>

                <label htmlFor="cost">
                  <p>custo: </p>
                  <input
                    onChange={(e) => setCost(Number(e.target.value))}
                    type="number"
                    id="cost"
                    value={cost}
                  />
                </label>

                <label htmlFor="description">
                  <p>descrição: </p>
                  <input
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    id="description"
                    value={description}
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
                Todos os serviços de: {userName}
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
                    saveDataId={serviceResponse}
                    service={service}
                    styles={styles}
                    serviceId={deleteService}
                    getData={costsResponse}
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
