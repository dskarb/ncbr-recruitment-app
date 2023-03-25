import { Checkbox, styled } from "@mui/material";

interface StyledCheckboxProps {
  error?: boolean;
}

export const StyledCheckbox = styled(Checkbox)<StyledCheckboxProps>(
  ({ theme, error, size }) => ({
    "&": {
      color: error ? theme.palette.error.main : theme.palette.text.primary,
    },
    "& .MuiSvgIcon-root": {
      fontSize: 24,
    },
    "& svg rect": {
      stroke: error ? theme.palette.error.main : theme.palette.action.active,
    },
    "& + .MuiFormControlLabel-label": {
      fontSize: size === "small" ? 12 : "initial",
      fontWeight: size === "small" ? 300 : "initial",
      color: size === "small" ? theme.palette.text.secondary : "initial",
      a: {
        color: theme.palette.primary.main,
        fontWeight: 600,
        textDecoration: "underline",
      },
      ".MuiFormLabel-asterisk": {
        color: theme.palette.error.main,
      },
    },
  })
);
