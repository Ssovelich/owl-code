import { BsArrowUpRight } from "react-icons/bs";
import styles from "./Services.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ModalCard from "../ModalCard/ModalCard";

const Services = () => {
  const [modalData, setModalData] = useState(null);
  const { t } = useTranslation("services");
  const servicesData = t("cards", { returnObjects: true });

  const handleOpenModal = (card) => {
    setModalData(card);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <div className={styles.services}>
      <div id="services" className={`container ${styles.services_container}`}>
        <h2 className={styles.title}>{t("common:services_title")}</h2>
        <ul className={styles.list}>
          {servicesData.map((card, index) => (
            <li
              className={styles.card}
              key={index}
              onClick={() => handleOpenModal(card)}
            >
              <h3 className={styles.TitleItem}>{card.title}</h3>
              <p className={styles.text}>{card.text}</p>
              <span className={styles.arrow}>
                <BsArrowUpRight className={styles.icon} />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ModalCard
        isOpen={!!modalData}
        onClose={handleCloseModal}
        title={modalData?.title}
        description={modalData?.description}
      />
    </div>
  );
};

export default Services;
