// https://zenn.dev/haru_iida/articles/nextjs_mui_admin
import {
  Box,
  Drawer,
  Toolbar,
} from "@mui/material";
import React from "react";

const drawerWidth = 400;

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return (
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
  );
};

export default SideBar;
