import * as Yup from "yup";

export const getValidationSchema = (t) =>
  Yup.object({
    name: Yup.string()
      .min(3, t("validation.name_min"))
      .max(20, t("validation.name_max"))
      .required(t("validation.name_required")),
    email: Yup.string()
      .email(t("validation.email_invalid"))
      .required(t("validation.email_required")),
    phone: Yup.string().matches(
      /^\+?\d{9,12}$/,
      t("validation.phone_invalid")
    ),
    message: Yup.string(),
  });
