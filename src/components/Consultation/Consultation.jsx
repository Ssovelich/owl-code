import styles from "./Consultation.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import { getValidationSchema } from "../../utils/schema";
import { useTranslation } from "react-i18next";

const INITIAL_VALUES = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const notifyTelegram = async (values) => {
  const { name, email, phone } = values;

  const message = `
📝 *Нове замовлення консультації!*
👤 Ім'я: ${name}
📧 Email: ${email}
📱 Телефон: ${phone}

📬 Перевірте пошту для деталей.
  `;

  try {
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );
  } catch (error) {
    console.error("Помилка при відправці в Telegram:", error);
  }
};
const Сonsultation = () => {
  const { t } = useTranslation('common');
  const validationSchema = getValidationSchema(t);

  const sendEmail = async (values, { resetForm, setSubmitting }) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        values,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      await notifyTelegram(values);

      toast.success(t("status_success"));
      resetForm();
    } catch (error) {
      toast.error(t("status_error"));
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
        <h2 className={styles.title}>{t("consultation_title")}</h2>
        <Toaster position="bottom-center" reverseOrder={false} />

        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={validationSchema}
          onSubmit={sendEmail}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.inputWrapper}>
                <Field
                  type="text"
                  name="name"
                  placeholder=" "
                  className={`${styles.input} ${
                    errors.name && touched.name ? styles.inputError : ""
                  }`}
                />
                <label
                  htmlFor="name"
                  className={`${styles.label} ${
                    errors.name && touched.name ? styles.labelError : ""
                  }`}
                >
                  {t("name")}
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
                  className={`${styles.input} ${
                    errors.email && touched.email ? styles.inputError : ""
                  }`}
                />
                <label
                  htmlFor="email"
                  className={`${styles.label} ${
                    errors.email && touched.email ? styles.labelError : ""
                  }`}
                >
                  {t("email")}
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
                  {t("phone")}
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
                  {t("message")}
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
                {isSubmitting ? <Loader /> : t("send")}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Сonsultation;
