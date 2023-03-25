import { Backdrop, alpha, CircularProgress } from "@mui/material";

type LoaderProps = {
  open: boolean;
};

const Loader = ({ open }: LoaderProps) => {
  return (
    <Backdrop
      open={open}
      sx={{
        backgroundColor: (theme) => alpha(theme.palette.common.white, 0.5),
        zIndex: 99999,
      }}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default Loader;
