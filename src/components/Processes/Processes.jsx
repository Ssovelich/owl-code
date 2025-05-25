import styles from "./Processes.module.css";

const Processes = () => {
  return (
    <div className={styles.processes}>
      <div id="services" className={`container ${styles.processes_container}`}>
        <h2 className={styles.title}>Етапи роботи</h2>
        <ul className={styles.wrapIcons}>
          <li className={styles.item}>
            <svg className={styles.icon} width={96} height={96} aria-hidden="true">
              <use href="/sprite.svg#icon-pen" />
            </svg>
            <span className={styles.text}>Заявка</span>
          </li>
          <li className={styles.item}>
             <svg className={styles.icon} width={96} height={96} aria-hidden="true">
              <use href="/sprite.svg#icon-note" />
            </svg>
            <span className={styles.text}>Бриф</span>
          </li>
          <li className={styles.item}>
             <svg className={styles.icon} width={96} height={96} aria-hidden="true">
              <use href="/sprite.svg#icon-brush" />
            </svg>
            <span className={styles.text}>Дизайн</span>
          </li>
          <li className={styles.item}>
            <svg className={styles.icon} width={96} height={96} aria-hidden="true">
              <use href="/sprite.svg#icon-dev" />
            </svg>
            <span className={styles.text}>Розробка</span>
          </li>
          <li className={styles.item}>
            <svg className={styles.icon} width={96} height={96} aria-hidden="true">
              <use href="/sprite.svg#icon-gears" />
            </svg>
            <span className={styles.text}>Тестування</span>
          </li>
          <li className={styles.item}>
             <svg className={styles.icon} width={96} height={96} aria-hidden="true">
              <use href="/sprite.svg#icon-rocket" />
            </svg>
            <span className={styles.text}>Запуск</span>
          </li>
        </ul>
        <hr className={styles.separator} />

      </div>
    </div>
  );
};

export default Processes;
