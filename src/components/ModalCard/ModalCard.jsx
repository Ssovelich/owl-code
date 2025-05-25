import styles from "./ModalCard.module.css";
import { IoMdClose } from "react-icons/io";

const ModalCard = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <IoMdClose />
        </button>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
      </div>
    </div>
  );
};

export default ModalCard;
