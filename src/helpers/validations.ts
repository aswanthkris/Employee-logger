import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  employeeId: Yup.string()
    .required("Required")
    .min(6, "Enter a valid employee ID"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Required"),
});
export const LoginSchema = Yup.object().shape({
  employeeId: Yup.string()
    .required("Required")
    .min(6, "Enter a valid employee ID"),

  password: Yup.string().required("Required"),
});
export const ProfileUpdateScheme = Yup.object().shape({
  department: Yup.string().required("Please specify your team !"),
  designation: Yup.string().required("Please specify your designation!"),
});
