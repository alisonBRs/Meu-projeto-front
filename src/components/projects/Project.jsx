import styles from "../../CSS/project.module.css";
import style from "../../CSS/card.module.css";

import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Card } from "../Card";
import { Modal } from "../modal/Modal";

export function Project() {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [getServices, setGetServices] = useState([]);
  const [projectId, setProjectId] = useState([]);

  const [isValid, setIsValid] = useState(true);
  const [alternativeModal, setAlternativeModal] = useState();

  const [budget, setBudget] = useState();
  const [costs, setCosts] = useState();

  const [getUser, setGetUser] = useState();
  const [id, setId] = useState();

  const [sum, setSum] = useState();

  const test = async () => {
    try {
      const data = await fetch("http://localhost:3030", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const dataJson = await data.json();
      setProjects(dataJson);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    test();
  }, []);

  const updateServices = (data) => {
    const newServices = services.map((service) => {
      if (service.id === data.id) {
        return { ...service, ...data };
      }

      return service;
    });
    setServices(newServices);
  };

  const updateProjectCost = (data) => {
    const updatedCost = { ...costs, data };
    setCosts(updatedCost.data.sum);

    return costs;
  };

  const showServices = async (id) => {
    setIsValid(!isValid);
    setAlternativeModal(false);

    await fetch(`http://localhost:3030/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setServices(data.services);
      });

    setCosts(updateProjectCost(sum));

    test();
  };

  const handleClick = () => {
    setIsValid(!isValid);
    setAlternativeModal(true);
  };

  async function Send(name, cost, description) {
    setIsValid(!isValid);

    await fetch(`http://localhost:3030/service/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, cost, description }),
    });

    let atualizeCost = Number(cost) + costs;

    await fetch(`http://localhost:3030/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cost: atualizeCost }),
    });

    await test();
  }

  async function removeProject(id) {
    await fetch(`http://localhost:3030/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setProjects(projects.filter((project) => project.id !== id));
    });
  }

  async function deleteService(serviceId, projectId, serviceCost) {
    await fetch(`http://localhost:3030/service/${projectId}/${serviceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setServices(services.filter((service) => service.id !== serviceId));
    });

    const sum = costs - serviceCost;

    await fetch(`http://localhost:3030/${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cost: sum }),
    });

    test();
  }

  return (
    <div className={styles.My_projects}>
      <div className={styles.project_title}>
        <h1>Meus projetos</h1>
        {projects.length > 0 ? <Button>Novo projeto</Button> : ""}
      </div>
      <div
        className={
          projects.length >= 4
            ? styles.project_container
            : styles.project_container_center
        }
      >
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className={style.card}>
              <Card
                id={project.id}
                handleSubmit={handleClick}
                projects={project}
                userName={setGetUser}
                userId={setId}
                dlProject={removeProject}
                services={showServices}
                budget={setBudget}
                costs={setCosts}
                getServicesLength={setGetServices}
                getProjectId={setProjectId}
              />
            </div>
          ))
        ) : (
          <div className={styles.no_projects}>
            <h2>Sem projetos no momento</h2>
            <Button>Criar projeto</Button>
          </div>
        )}
      </div>

      <Modal
        alternateModal={alternativeModal}
        postService={Send}
        userName={getUser}
        userData={handleClick}
        isValid={isValid}
        services={services}
        budget={budget}
        costs={costs}
        projects={getServices}
        servicesId={deleteService}
        projectId={projectId}
        updateServices={updateServices}
        updateProjectCost={updateProjectCost}
        costSum={setSum}
      />
    </div>
  );
}
