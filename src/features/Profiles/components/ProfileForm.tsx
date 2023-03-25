import { LoadingButton } from "@mui/lab";
import { MenuItem, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { ROUTES_PROFILES } from "commons/constants/paths";
import yup from "commons/yup";
import CheckboxFormik from "components/formik/CheckboxFormik";
import DatePickerFormik from "components/formik/DatePickerFormik";
import TextFieldFormik from "components/formik/TextFieldFormik";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { ProfileFormValuesInterface } from "types/shared.types";
import {
  addProfile,
  editProfile,
  selectIsProfilesLoading,
} from "../redux/profilesSlice";

const ProfileFormValidationSchema = yup.object({
  name: yup.string().trim().required().max(128),
  surname: yup.string().trim().required().max(128),
  email: yup.string().trim().email().required().max(254),
  userType: yup.string().trim().required().max(128),
  date: yup.date().nullable().required(),
  gdpr: yup.bool().oneOf([true], "Please consent to GDPR rules"),
});

const initialProfileFormValues = {
  name: "",
  surname: "",
  email: "",
  userType: "",
  date: new Date(),
  gdpr: false,
};

interface ProfileFormProps {
  profileId?: string;
  profileValues?: ProfileFormValuesInterface;
}

const ProfileForm = ({ profileId, profileValues }: ProfileFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsProfilesLoading);

  const handleSaveProfileForm = async (values: ProfileFormValuesInterface) => {
    profileId
      ? await dispatch(editProfile({ id: profileId, formValues: values }))
      : await dispatch(addProfile(values));
    navigate(ROUTES_PROFILES.PROFILES_LIST);
  };

  return (
    <Box>
      <Formik
        initialValues={profileValues || initialProfileFormValues}
        onSubmit={(values) => handleSaveProfileForm(values)}
        validationSchema={ProfileFormValidationSchema}
        enableReinitialize
      >
        <Form>
          <Stack gap={1}>
            <TextFieldFormik
              type="text"
              name="name"
              label="Name"
              placeholder="Enter your name"
            />
            <TextFieldFormik
              type="text"
              name="surname"
              label="Surname"
              placeholder="Enter your surname"
            />
            <TextFieldFormik
              type="email"
              name="email"
              label="E-mail"
              placeholder="Enter your e-mail address"
            />
            <TextFieldFormik
              name="userType"
              label="User type"
              placeholder="Select your user type"
              select
            >
              <MenuItem value="Superuser">Superuser</MenuItem>
              <MenuItem value="Administrator">Administrator</MenuItem>
              <MenuItem value="Basic user">Basic user</MenuItem>
            </TextFieldFormik>

            <DatePickerFormik name="date" inputLabel="Birthday date" disableFuture />

            <CheckboxFormik
              name="gdpr"
              required
              label="I hereby agree to the GDPR rules"
              size="small"
            />
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={isLoading}
              fullWidth
            >
              Submit
            </LoadingButton>
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
};

export default ProfileForm;
