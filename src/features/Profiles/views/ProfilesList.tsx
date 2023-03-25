import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import PanelWrapper from "commons/wrappers/PanelWrapper/PanelWrapper";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { deleteProfile, selectIsProfilesLoading, selectProfiles } from "../redux/profilesSlice";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useNavigate } from "react-router-dom";
import { ROUTES_PROFILES } from "commons/constants/paths";
import Loader from "components/Loader";

const ProfilesList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profiles = useAppSelector(selectProfiles);
  const isLoading = useAppSelector(selectIsProfilesLoading);

  const columns: GridColDef[] = [
    { field: "name", headerName: "First name", width: 130 },
    { field: "surname", headerName: "Last name", width: 130 },
    {
      field: "date",
      headerName: "Birthday date",
      type: "string",
      width: 130,
    },
    {
      field: "userType",
      headerName: "User type",
      width: 160,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" alignItems="center" gap={1}>
          <IconButton
            size="small"
            title="Delete"
            onClick={() => dispatch(deleteProfile(params.row.id))}
          >
            <DeleteForeverOutlinedIcon />
          </IconButton>
          <IconButton
            size="small"
            title="Edit"
            onClick={() =>
              navigate(ROUTES_PROFILES.PROFILE_EDIT(params.row.id))
            }
          >
            <EditOutlinedIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <PanelWrapper>
      <Box pt={7} pb={5}>
        <Grid container mb={7} alignItems="stretch">
          <Grid item xs={12}>
            <Typography variant="h4">Profiles list</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box height={500}>
              <DataGrid
                rows={profiles}
                columns={columns}
                disableRowSelectionOnClick
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Loader open={isLoading} />
    </PanelWrapper>
  );
};

export default ProfilesList;
