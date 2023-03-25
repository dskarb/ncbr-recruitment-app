import { Box, Grid, Typography } from "@mui/material";
import PanelWrapper from "commons/wrappers/PanelWrapper/PanelWrapper";
import ProfileForm from "../components/ProfileForm";

const AddProfile = () => {
  return (
    <PanelWrapper>
      <Box pt={7} pb={5}>
        <Grid container mb={7} alignItems="stretch">
          <Grid item xs={12}>
            <Typography variant="h4">Add profile</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProfileForm />
          </Grid>
        </Grid>
      </Box>
    </PanelWrapper>
  );
};

export default AddProfile;
