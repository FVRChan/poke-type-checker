// https://zenn.dev/haru_iida/articles/nextjs_mui_admin
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";

const drawerWidth = 400;

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    // <AppBar
    //     position="fixed"
    //     sx={{
    //       width: { sm: `calc(100% - ${drawerWidth}px)` },
    //       ml: { sm: `${drawerWidth}px` },
    //     }}
    //   >
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>{children}</Box>
    </Drawer>
    // </AppBar>
  
  );
};

export default SideBar;
