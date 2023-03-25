import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
  Box,
  alpha,
} from "@mui/material";
import { ReactElement } from "react";

type SidebarMenuItemProps = {
  menuItem: { route: string; label: string; icon: ReactElement };
  selected: boolean;
  onClick: () => void;
};

const SidebarMenuItemWrapper = styled(Box)(({ theme }) => ({
  "&": {
    marginBottom: theme.spacing(1),
  },
  "& .MuiListItemButton-root": {
    transition: theme.transitions.create(["all"]),
    paddingLeft: 24,
    paddingRight: 18,
    background: "transparent",
    borderRadius: 8,
    justifyContent: "flex-start",

    "&.Mui-selected": {
      background: `${alpha(theme.palette.primary.main, 0.2)} !important`,
      boxShadow: "0px 6px 13px rgba(0, 0, 0, 0.03)",
    },
  },
  "& .MuiListItemIcon-root": {
    transition: theme.transitions.create(["all"]),
    minWidth: 0,
    marginRight: 14,
  },
  "& .MuiListItemText-root": {
    fontSize: 16,
    lineHeight: "30px",
  },
  "& .Mui-selected, & .MuiListItemButton-root:hover": {
    background: alpha(theme.palette.primary.main, 0.05),
  },
}));

const SidebarMenuItem = ({
  menuItem,
  selected,
  onClick,
}: SidebarMenuItemProps) => {
  return (
    <SidebarMenuItemWrapper>
      <ListItemButton
        selected={selected}
        onClick={onClick}
        sx={{ minHeight: 30 }}
      >
        <ListItemIcon color="primary">{menuItem.icon}</ListItemIcon>
        <ListItemText sx={{ display: "block" }}>
          <Typography noWrap>{menuItem.label}</Typography>
        </ListItemText>
      </ListItemButton>
    </SidebarMenuItemWrapper>
  );
};

export default SidebarMenuItem;
