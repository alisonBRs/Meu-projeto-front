import styles from "../CSS/card.module.css";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

export function Card({
  projects,
  handleSubmit,
  id,
  userName,
  userId,
  dlProject,
  services,
}) {
  function handleClick() {
    handleSubmit();
    userName(projects.name);
    userId(projects.id);
  }

  function showServices() {
    services(id);
  }

  function removeProject() {
    dlProject(id);
  }

  return (
    <>
      <h2>{projects.name}</h2>

      <div>
        <p>carteira: </p>
        <span>
          <span>R$</span>
          {projects.budget}
        </span>
      </div>

      {projects.services.length ? (
        <div className={styles.number_services}>
          <span>{projects.services.length}</span>
          <Link onClick={showServices}>
            {projects.services.length <= 1 ? "serviço" : "serviços"}
          </Link>
        </div>
      ) : (
        <div className={styles.no_services}>
          <p>nenhum serviço</p>
        </div>
      )}

      <div className={styles.services_btn}>
        <div onClick={handleClick} className={styles.btn_store}>
          <MdOutlineLocalGroceryStore />
          <p>Adicionar serviço</p>
        </div>

        <div onClick={removeProject} className={styles.btn_delete}>
          <RiDeleteBin6Line />
          <p>Excluir projeto</p>
        </div>
      </div>
    </>
  );
}
