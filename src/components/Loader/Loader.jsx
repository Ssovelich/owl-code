import styles from "./Loader.module.css";
import BeatLoader from "react-spinners/BeatLoader";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <BeatLoader
        color={"#582ad6eb"}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;