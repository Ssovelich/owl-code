import styles from "./Сonsultation.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import {validationSchema} from "../../utils/schema";

const INITIAL_VALUES = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const Сonsultation = () => {
  const sendEmail = async (values, { resetForm, setSubmitting }) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        values,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success("Повідомлення успішно надіслано!");
      resetForm();
    } catch (error) {
      toast.error("Помилка при надсиланні. Спробуйте ще раз.");
      console.error("EmailJS error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.consultation}>
      <div
        id="consultation"
        className={`container ${styles.consultation_container}`}
      >
        <h2 className={styles.title}>Отримайте безкоштовну консультацію</h2>
        <Toaster position="bottom-center" reverseOrder={false} />

        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={validationSchema}
          onSubmit={sendEmail}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.inputWrapper}>
                <Field
                  type="text"
                  name="name"
                  placeholder=" "
                  className={styles.input}
                />
                <label htmlFor="name" className={styles.label}>
                  Ваше ім'я*
                </label>
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.inputWrapper}>
                <Field
                  type="email"
                  name="email"
                  placeholder=" "
                  className={styles.input}
                />
                <label htmlFor="email" className={styles.label}>
                  Ваш Email*
                </label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.inputWrapper}>
                <Field
                  type="tel"
                  name="phone"
                  placeholder=" "
                  className={styles.input}
                />
                <label htmlFor="phone" className={styles.label}>
                  Ваш телефон
                </label>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.inputWrapper}>
                <Field
                  as="textarea"
                  name="message"
                  placeholder=" "
                  className={`${styles.input} ${styles.textarea}`}
                />
                <label htmlFor="message" className={styles.label}>
                  Коментар
                </label>
                <ErrorMessage
                  name="message"
                  component="div"
                  className={styles.error}
                />
              </div>

              <button
                type="submit"
                className={styles.button}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader /> : "Замовити консультацію"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Сonsultation;
