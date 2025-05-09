import styles from "./Advantages.module.css";
import data from "../helpers/advanteges";

const Advantages = () => {
  return (
    <div className={styles.advantages}>
      <div
        id="advantages"
        className={`container ${styles.advantages_container}`}
      >
        <h2 className={styles.title}>Чому саме ми?</h2>

        <ul className={styles.list}>
          {data.map((text, index) => (
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
