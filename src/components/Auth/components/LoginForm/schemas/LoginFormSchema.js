import * as yup from "yup";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    // .matches(/@ddu\.ac\.in$/, "Email must end with @ddu.ac.in")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required"),
});

export default loginValidationSchema;