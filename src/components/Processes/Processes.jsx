import styles from "./Processes.module.css";
import { useTranslation } from "react-i18next";

const Processes = () => {
  const { t } = useTranslation("processes");
  const steps = t("steps", { returnObjects: true });

  return (
    <div className={styles.processes}>
      <div id="services" className={`container ${styles.processes_container}`}>
        <h2 className={styles.title}>{t("common:processes_title")}</h2>

        <ul className={styles.wrapIcons}>
          {steps.map((step) => (
            <li key={step.id} className={styles.item}>
              <svg className={styles.icon} aria-hidden="true">
                <use href={`/sprite.svg#icon-${step.id}`} />
              </svg>
              <span className={styles.text}>{step.label}</span>
            </li>
          ))}
        </ul>

        <hr className={styles.separator} />
      </div>
    </div>
  );
};

export default Processes;
