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
                <svg
                  className={styles.icon}
                  // width={96}
                  // height={96}
                  aria-hidden="true"
                >
                  <use href={`/sprite.svg#icon-${step.id}`} />
                </svg>
                <span className={styles.text}>{step.label}</span>
              </div>

              {/* стрілка, якщо не останній елемент */}
              {index < steps.length - 1 && (
                <div
                  className={`${styles.arrowWrap} ${
                    index === 2 ? styles.hideOnTablet : ""
                  }`}
                >
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
