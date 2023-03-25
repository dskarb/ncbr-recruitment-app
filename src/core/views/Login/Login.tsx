import { Container, Box, Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextFieldFormik from "components/formik/TextFieldFormik";
import { Formik, Form } from "formik";
import yup from "commons/yup";
import snackbarUtils from "utils/snackbarUtils";
import { LoadingButton } from "@mui/lab";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES_CORE } from "commons/constants/paths";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import {
  login,
  selectIsAuthenticated,
  selectIsAuthenticationPending,
} from "core/store/authSlice";

const LoginFormValidationSchema = yup.object({
  email: yup.string().trim().email().required().max(254),
  password: yup.string().trim().required().max(128),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthenticationPending);
  const token = useAppSelector(selectIsAuthenticated);
  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values: typeof initialValues) => {
    const response = await dispatch(login(values));
    if (response.meta.requestStatus === "fulfilled") {
      navigate(ROUTES_CORE.DASHBOARD);
    } else {
      snackbarUtils.error("Login credentials invalid.");
    }
  };

  if (token) {
    return <Navigate to={ROUTES_CORE.DASHBOARD} />;
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1, width: "100%" }}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleLogin(values)}
            validationSchema={LoginFormValidationSchema}
          >
            <Form>
              <Box mb={3}>
                <TextFieldFormik
                  type="email"
                  name="email"
                  label="E-mail"
                  placeholder="Enter your e-mail address"
                />
              </Box>
              <Box mb={3}>
                <TextFieldFormik
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={2}
              >
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  fullWidth
                  loading={isLoading}
                >
                  Login
                </LoadingButton>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
