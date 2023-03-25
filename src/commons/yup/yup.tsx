import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "This field is required",
  },
  string: {
    email: "Enter valid e-mail",
    max: ({ max }) => `This field can't be longer than ${max} characters`,
  },
});

export default yup;
