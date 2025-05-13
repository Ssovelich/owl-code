import { useState } from "react";
import styles from "./Projects.module.css";
import projects from "./projectsData.json";
import { BsArrowUpRight } from "react-icons/bs";


const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const { title, description, image, link } = projects[currentIndex];

  return (
    <div className={styles.projects}>
      <div id="projects" className={`container ${styles.projects_container}`}>
        <h2 className={styles.title}>Мої проєкти</h2>

        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img src={image} alt={title} className={styles.image} />
          </div>
          <div className={styles.info}>
            <h3 className={styles.titleInfo}>{title}</h3>
            <p className={styles.textInfo}>{description}</p>
            <a className={styles.linkInfo} href={link} target="_blank" rel="noopener noreferrer">
              View Project
               <BsArrowUpRight className={styles.icon} />
            </a>
          </div>
        </div>

        <div className={styles.controls}>
          <button onClick={handlePrev} className={`${styles.arrow} ${styles.arrowLeft}`}>
             <BsArrowUpRight className={styles.arrowIcon} />
          </button>
          <button onClick={handleNext} className={styles.arrow}>
             <BsArrowUpRight className={styles.arrowIcon} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Projects;
