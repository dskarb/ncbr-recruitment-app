import {
  Box,
  Container,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { ROUTES_CORE, ROUTES_PROFILES } from "commons/constants/paths";
import { logout } from "core/store/authSlice";
import { useAppDispatch } from "core/store/hooks";
import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SidebarMenuItem from "components/SidebarMenuItem";
import logo from "assets/logo.png";

const AppMenu = [
  {
    route: ROUTES_CORE.DASHBOARD,
    label: "Home",
    icon: <HomeOutlinedIcon />,
  },
  {
    route: ROUTES_PROFILES.ADD_PROFILE,
    label: "Add profile",
    icon: <PersonAddOutlinedIcon />,
  },
  {
    route: ROUTES_PROFILES.PROFILES_LIST,
    label: "Profiles list",
    icon: <ListAltOutlinedIcon />,
  },
];

export interface PanelWrapperProps {
  children: ReactNode;
}

const PanelWrapper = ({ children }: PanelWrapperProps) => {
  const drawerWidth = 290;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [activeRoute, setActiveRoute] = useState("");

  useEffect(() => {
    setActiveRoute(`${location.pathname}`);
  }, [location]);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={(theme) => ({
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            transition: theme.transitions.create(["all"]),
            width: drawerWidth,
            boxSizing: "border-box",
            border: 0,
            background: (theme) => theme.palette.grey.A100,
            overflowX: "hidden",
          },
        })}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            px: "16px !important",
            width: drawerWidth,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: 50,
              img: {
                maxWidth: 50,
                height: "auto",
              },
            }}
          >
            <img src={logo} alt="Logo" />
          </Box>
        </Toolbar>
        <Box>
          <List
            component="nav"
            sx={{
              flexGrow: 1,
              px: 2,
              py: 0,
              marginTop: 5,
              marginBottom: 3,
            }}
          >
            {AppMenu.map((menuItem, i) => (
              <SidebarMenuItem
                key={i}
                menuItem={menuItem}
                selected={
                  activeRoute.length !== 0 && menuItem.route === activeRoute
                }
                onClick={() => navigate(menuItem.route)}
              />
            ))}
          </List>
        </Box>
        <Box
          sx={{
            px: 3,
            pb: 3,
            marginTop: "auto",
          }}
        >
          <Typography
            variant="body2"
            onClick={() => dispatch(logout())}
            sx={{ cursor: "pointer" }}
            textAlign="left"
          >
            Log out
          </Typography>
        </Box>
      </Drawer>
      <Box
        id="main"
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Box>
          <Container
            fixed
            maxWidth="xl"
            sx={{
              maxWidth: "100%",
            }}
          >
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default PanelWrapper;
