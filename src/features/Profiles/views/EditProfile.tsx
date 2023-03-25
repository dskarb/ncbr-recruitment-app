import { Box, Grid, Typography } from "@mui/material";
import { ROUTES_PROFILES } from "commons/constants/paths";
import PanelWrapper from "commons/wrappers/PanelWrapper/PanelWrapper";
import { useAppSelector } from "core/store/hooks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileFormValuesInterface } from "types/shared.types";
import { stateValuesToFormValues } from "utils/helpers";
import snackbarUtils from "utils/snackbarUtils";
import ProfileForm from "../components/ProfileForm";
import { selectProfiles } from "../redux/profilesSlice";

const EditProfile = () => {
  const navigate = useNavigate();
  const { profileId } = useParams<"profileId">();
  const [transformedProfileData, setTransformedProfileData] =
    useState<ProfileFormValuesInterface>();

  const profiles = useAppSelector(selectProfiles);

  useEffect(() => {
    const profileData = profiles.find((x) => x.id === profileId);
    if (profileData) {
      setTransformedProfileData(stateValuesToFormValues(profileData));
    } else {
      navigate(ROUTES_PROFILES.PROFILES_LIST);
      snackbarUtils.error("Profile doesn't exist.");
    }
  }, []);

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
            <ProfileForm
              profileId={profileId}
              profileValues={transformedProfileData}
            />
          </Grid>
        </Grid>
      </Box>
    </PanelWrapper>
  );
};

export default EditProfile;
