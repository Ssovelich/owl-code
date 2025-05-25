import styles from "./Advantages.module.css";
import { useTranslation } from "react-i18next";

const Advantages = () => {
  const { t } = useTranslation( 'advantages');
  const raw = t("items", { returnObjects: true });
  const advantages = Array.isArray(raw) ? raw : [];

  return (
    <div className={styles.advantages}>
      <div
        id="advantages"
        className={`container ${styles.advantages_container}`}
      >
        <h2 className={styles.title}>{t("common:advantages_title")}</h2>

        <ul className={styles.list}>
          {advantages.map((text, index) => (
            <li key={index} className={styles.item}>
              <div className={styles.badge}>
                <span className={styles.number}>{index + 1}</span>
              </div>
              <p className={styles.text}>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Advantages;
