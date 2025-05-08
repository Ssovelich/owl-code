import logo from "../../../public/ChatGPT Img white.png";
import styles from "./Hero.module.css";

const Hero = ({ scrolled }) => {
  return (
    <div className={styles.hero}>
      <div className={`container ${styles.hero_container}`}>
        <img
          src={logo}
          className={`${styles.logo} ${scrolled ? styles.hide : ''}`}
          alt="Owl logo"
        />
        <h1 className={styles.title}>
          Створюємо сайти, які приносять результат
        </h1>
        <a href="#consultation"
          className={`${styles.consultationBtn} ${scrolled ? styles.hide : ''}`}
        >
          Замовити консультацію
        </a>
      </div>
    </div>
  );
};

export default Hero;
