import styles from "./ModalCard.module.css";
import { IoMdClose } from "react-icons/io";

const ModalCard = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  const renderDescription = () => {
    if (Array.isArray(description)) {
      return description.map((text, index) => (
        <p key={index} className={styles.description}>
          {text}
        </p>
      ));
    } else if (description?.paragraphs) {
      return (
        <>
          {description.paragraphs.map((text, index) => (
            <p key={index} className={styles.description}>
              {text}
            </p>
          ))}
          {description.listTitle && (
            <p className={styles.descriptionListTitle}>
              {description.listTitle}
            </p>
          )}
          {description.list && (
            <ul className={styles.descriptionList}>
              {description.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </>
      );
    } else {
      return <p className={styles.description}>{description}</p>;
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* <div className="container"> */}
          <button className={styles.closeBtn} onClick={onClose}>
            <IoMdClose />
          </button>
          <h3 className={styles.title}>{title}</h3>
          {renderDescription()}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ModalCard;
