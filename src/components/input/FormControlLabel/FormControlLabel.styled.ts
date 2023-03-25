import { FormControlLabel, styled } from "@mui/material";

export const StyledControlLabel = styled(FormControlLabel)(() => ({
  "&.MuiFormControlLabel-labelPlacementEnd": {
    alignItems: "flex-start",
  },
  "& .MuiTypography-root": {
    paddingTop: 9,
  },
}));
