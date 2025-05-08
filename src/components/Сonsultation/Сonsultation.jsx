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
    <div  className={styles.consultation}>
      <div id="consultation" className={`container ${styles.consultation_container}`}>
        <h2 className={styles.title}>Отримайте безкоштовну консультацію</h2>

        <Toaster position="bottom-center" reverseOrder={false} />

        <form ref={formRef} onSubmit={sendEmail} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Ваше ім'я*"
            className={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            className={styles.input}
            placeholder="Ваш Email*"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Ваш телефон"
            className={styles.input}
          />
          <textarea
            name="message"
            className={styles.input}
            placeholder="Коментар"
          />
          <button type="submit" className={styles.button}>
            Замовити консультацію
          </button>
        </form>
      </div>
    </div>
  );
};

export default Сonsultation;
