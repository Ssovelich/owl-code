import styles from "./Processes.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const Processes = () => {
  const { t } = useTranslation("processes");
  const steps = t("steps", { returnObjects: true });

  return (
    <div className={styles.processes}>
      <div id="services" className={`container ${styles.processes_container}`}>
        <h2 className={styles.title}>{t("common:processes_title")}</h2>

        <ul className={styles.wrapIcons}>
          {steps.map((step, index) => (
            <li key={step.id} className={styles.itemGroup}>
              <div className={styles.item}>
                <svg className={styles.icon} aria-hidden="true">
                  <use href={`/sprite.svg#icon-${step.id}`} />
                </svg>
                <span className={styles.text}>{step.label}</span>
              </div>

              {/* Стрілка між іконками (не остання) */}
              {index !== 2 && index !== 5 && (
                <div className={styles.arrowWrap}>
                  <FaArrowRightLong className={styles.arrow} />
                </div>
              )}
              {/* Додаткова стрілка на десктопі між 3 і 4 (index === 2) */}
              {index === 2 && (
                <div className={`${styles.arrowWrap} ${styles.desktopOnly}`}>
                  <FaArrowRightLong className={styles.arrow} />
                </div>
              )}
            </li>
          ))}
        </ul>

        <hr className={styles.separator} />
      </div>
    </div>
  );
};

export default Processes;
