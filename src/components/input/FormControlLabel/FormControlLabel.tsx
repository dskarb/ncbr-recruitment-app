import { FormControlLabelProps as MuiFormControlLabelProps } from "@mui/material";
import { StyledControlLabel } from "./FormControlLabel.styled";

export type FormControlLabelProps = MuiFormControlLabelProps;

const FormControlLabel = (props: FormControlLabelProps) => {
  return <StyledControlLabel {...props} />;
};

export default FormControlLabel;
