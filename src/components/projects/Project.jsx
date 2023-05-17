import styles from "../../CSS/project.module.css";
import style from "../../CSS/card.module.css";

import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Card } from "../Card";
import { Modal } from "../Modal/Modal";

export function Project() {
  const [projects, setProjects] = useState([]);
  const [isValid, setIsValid] = useState(true);

  const [getUser, setGetUser] = useState();
  const [id, setId] = useState();

  const [name, setName] = useState();
  const [cost, setCost] = useState();
  const [description, setDescciption] = useState();

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

  const handleClick = () => {
    setIsValid(!isValid);
  };

  return (
    <div className={styles.My_projects}>
      <h1>Meus projetos</h1>

      <div className={styles.project_container}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className={style.card}>
              <Card
                id={project.id}
                handleSubmit={handleClick}
                projects={project}
                userName={setGetUser}
                userId={setId}
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
        name={setName}
        cost={setCost}
        description={setDescciption}
        userId={getUser}
        userData={handleClick}
        isValid={isValid}
        id={id}
      />
    </div>
  );
}
