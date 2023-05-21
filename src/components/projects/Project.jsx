import styles from "../../CSS/project.module.css";
import style from "../../CSS/card.module.css";

import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Card } from "../Card";
import { Modal } from "../Modal/Modal";

export function Project() {
  const [projects, setProjects] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [alternativeModal, setAlternativeModal] = useState(true);

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

  const showServices = () => {
    setIsValid(!isValid);
    setAlternativeModal(false);
  };

  const handleClick = () => {
    setIsValid(!isValid);
    setAlternativeModal(true);
  };

  function Send(name, cost, description) {
    setIsValid(!isValid);

    console.log(name, cost, description);

    fetch(`http://localhost:3030/service/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, cost, description }),
    });

    return window.location.reload(false);
  }

  function removeProject(id) {
    fetch(`http://localhost:3030/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setProjects(projects.filter((project) => project.id !== id));
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
      />
    </div>
  );
}
