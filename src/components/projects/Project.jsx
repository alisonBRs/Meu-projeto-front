import styles from "../../CSS/project.module.css";
import style from "../../CSS/card.module.css";

import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Card } from "../Card";
import { Modal } from "../Modal/Modal";

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

  useEffect(() => {
    fetch("http://localhost:3030", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.log(err));
  }, []);

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

    let atualizeCost = cost + costs;

    await fetch(`http://localhost:3030/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cost: atualizeCost }),
    });

    console.log(cost + " + " + cost + " = " + atualizeCost);

    //return window.location.reload(false);
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

  async function deleteService(serviceId, projectId) {
    await fetch(`http://localhost:3030/service/${projectId}/${serviceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setServices(services.filter((service) => service.id !== serviceId));
    });
  }

  return (
    <div className={styles.My_projects}>
      <h1>Meus projetos</h1>

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
            <h2>Sem progetos no momento</h2>
            <Button>Criar projeto</Button>
          </div>
        )}
      </div>

      <Modal
        alternateModal={alternativeModal}
        postService={Send}
        userId={getUser}
        userData={handleClick}
        isValid={isValid}
        services={services}
        budget={budget}
        costs={costs}
        projects={getServices}
        servicesId={deleteService}
        projectId={projectId}
      />
    </div>
  );
}
