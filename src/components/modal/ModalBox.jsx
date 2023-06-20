import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";

export function ModalBox({ service, styles, serviceId }) {
  const [toggle, setToggle] = useState(false);

  const deleteService = () => {
    serviceId(service.id);
  };

  const toggleEdit = () => {
    setToggle(!toggle);
  };
  return (
    <>
      {!toggle ? (
        <>
          <div className={styles.services_descriptions}>
            <h4>{service.name}</h4>
            <p>Custo: R${service.cost.toLocaleString("pt-br")}</p>
            <p>{service.description}</p>
          </div>

          <div className={styles.services_btns}>
            <span onClick={toggleEdit} className={styles.edit}>
              <FaRegEdit />
            </span>
            <span onClick={deleteService} className={styles.trash}>
              <RiDeleteBin6Line />
            </span>
          </div>
        </>
      ) : (
        <div className={styles.edit_services}>
          <h3>Editar serviço</h3>
          <form autoComplete="off">
            <label htmlFor="name">
              <input placeholder="nome do serviço" type="text" id="name" />
            </label>

            <label htmlFor="cost">
              <input placeholder="custo" type="number" id="cost" />
            </label>

            <label htmlFor="description">
              <input placeholder="descrição" type="text" id="description" />
            </label>

            <div className={styles.edit_services_btns}>
              <button onClick={toggleEdit}>Cancelar</button>
              <button>Salvar</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
