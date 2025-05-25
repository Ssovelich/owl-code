import styles from "./About.module.css";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  const raw = t("paragraphs", { returnObjects: true });
  const paragraphs = Array.isArray(raw) ? raw : [];

  return (
    <div className={styles.about}>
      <div id="about" className={`container ${styles.about_container}`}>
        <h2 className={styles.title}>{t("common:about_title")}</h2>

        <article className={styles.wrapperText}>
          {paragraphs.map((text, idx) => (
            <p
              key={idx}
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))}
        </article>
      </div>
    </div>
  );
};

export default About;
