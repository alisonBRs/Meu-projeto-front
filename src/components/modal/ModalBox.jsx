import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";

export function ModalBox({ service, styles, serviceId, saveDataId }) {
  const [toggle, setToggle] = useState(false);

  const [name, setName] = useState(service.name);
  const [cost, setCost] = useState(service.cost);
  const [description, setDescription] = useState(service.description);

  const deleteService = () => {
    serviceId(service.id);
  };

  const sendData = (e) => {
    e.preventDefault();
    saveDataId(service.id, name, cost, description);
    //setToggle(!toggle);
  };

  const toggleEdit = () => {
    setToggle(!toggle);
  };

  const toggleCancel = () => {
    setToggle(!toggle);

    setName(service.name);
    setCost(service.cost);
    setDescription(service.description);
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
            <span onClick={deleteService} className={styles.trash}>
              <RiDeleteBin6Line />
            </span>
            <span onClick={toggleEdit} className={styles.edit}>
              <FaRegEdit />
            </span>
          </div>
        </>
      ) : (
        <div className={styles.edit_services}>
          <h3>Editar serviço</h3>
          <form onSubmit={sendData} autoComplete="off">
            <label htmlFor="name">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                value={name}
              />
            </label>

            <label htmlFor="cost">
              <input
                onChange={(e) => setCost(e.target.value)}
                type="number"
                id="cost"
                value={cost}
              />
            </label>

            <label htmlFor="description">
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                id="description"
                value={description}
              />
            </label>

            <div className={styles.edit_services_btns}>
              <button>Salvar</button>
              <a onClick={toggleCancel}>Cancelar</a>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
