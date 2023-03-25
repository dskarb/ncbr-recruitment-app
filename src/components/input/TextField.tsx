import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  styled,
  Box,
  FormLabel,
  MenuItem,
} from "@mui/material";
import { ReactElement } from "react";

const StyledMuiTextField = styled(MuiTextField)(() => ({}));

const StyledEmptyMenuItem = styled(MenuItem)`
  min-height: 36px;
`;

export interface TextFieldProps extends Omit<MuiTextFieldProps, "label"> {
  clearItemText?: string;
  clearable?: boolean;
  label?: ReactElement | string;
}

const TextField = ({
  select,
  children,
  clearItemText = "Wyczyść",
  clearable,
  label,
  required,
  disabled,
  ...rest
}: TextFieldProps) => {
  return (
    <Box>
      {label && (
        <FormLabel required={required} disabled={disabled}>
          {label}
        </FormLabel>
      )}
      <StyledMuiTextField
        select={select}
        children={
          select && clearable
            ? [
                <StyledEmptyMenuItem value="" key="clear">
                  <em>{clearItemText}</em>
                </StyledEmptyMenuItem>,
                children,
              ]
            : children
        }
        required={required}
        disabled={disabled}
        {...rest}
      />
    </Box>
  );
};

export default TextField;
