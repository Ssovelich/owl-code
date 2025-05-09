import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Занадто коротке!")
    .max(20, "Занадто довге!")
    .required("Ім'я обов'язкове"),
  email: Yup.string()
    .email("Невірний формат email")
    .required("Email обов'язковий"),
  phone: Yup.string().matches(/^\+?\d{9,12}$/, "Некоректний номер телефону"),
  message: Yup.string(),
});
