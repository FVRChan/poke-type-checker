// https://qiita.com/uniuni__8282/items/359a5ec90742a696a1c1
import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { AppBar, Toolbar } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function TemporaryDrawer({
  children,
  open,
  toggleOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  toggleOpen: () => void;
}) {
  return (
    <div style={{ height: "100px" }}>
      <Drawer anchor="bottom" open={open} onClose={toggleOpen}>
        <AppBar
          position="sticky"
          style={{
            width: "100%",
          }}
        >
          <Toolbar variant="dense">
            <button
              onClick={toggleOpen}
              style={{
                textAlign: "center",
                width: "100%",
                height: "100%",
                background: "none",
                border: "none",
              }}
            >
              <Close></Close>
            </button>
          </Toolbar>
        </AppBar>
        {children}
      </Drawer>
    </div>
  );
}
