import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

export function ModalBox({ service, styles, serviceId }) {
  const deleteService = () => {
    serviceId(service.id);
  };
  return (
    <>
      <div className={styles.services_descriptions}>
        <h4>{service.name}</h4>
        <p>Custo: R${service.cost.toLocaleString("pt-br")}</p>
        <p>{service.description}</p>
      </div>

      <div className={styles.services_btns}>
        <span className={styles.edit}>
          <FaRegEdit />
        </span>
        <span onClick={deleteService} className={styles.trash}>
          <RiDeleteBin6Line />
        </span>
      </div>
    </>
  );
}
