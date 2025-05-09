import styles from "./Сonsultation.module.css";
import { useRef } from "react";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";

const Сonsultation = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        toast.success("Повідомлення успішно надіслано!");
        formRef.current.reset();
      })
      .catch((err) => {
        toast.error("Помилка при надсиланні. Спробуйте ще раз.");
        console.error("EmailJS error:", err);
      });
  };

  return (
    <div className={styles.consultation}>
      <div
        id="consultation"
        className={`container ${styles.consultation_container}`}
      >
        <h2 className={styles.title}>Отримайте безкоштовну консультацію</h2>

        <Toaster position="bottom-center" reverseOrder={false} />

        <form ref={formRef} onSubmit={sendEmail} className={styles.form}>

          <div className={styles.inputWrapper}>
            <input type="text" id="name" name="name" placeholder=" " className={styles.input} required />
            <label htmlFor="name" className={styles.label}>Ваше ім'я*</label>
          </div>

          <div className={styles.inputWrapper}>
            <input type="email" id="email" name="email" placeholder=" " className={styles.input} required />
            <label htmlFor="email" className={styles.label}>Ваш Email*</label>
          </div>

          <div className={styles.inputWrapper}>
            <input type="tel" id="phone" name="phone" placeholder=" " className={styles.input} />
            <label htmlFor="phone" className={styles.label}>Ваш телефон</label>
          </div>

         <div className={styles.inputWrapper}>
            <textarea id="message" name="message" placeholder=" " className={`${styles.input} ${styles.textarea}`} />
            <label htmlFor="message" className={styles.label}>Коментар</label>
          </div>

          <button type="submit" className={styles.button}>
            Замовити консультацію
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Сonsultation;
