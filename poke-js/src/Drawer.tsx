// https://qiita.com/uniuni__8282/items/359a5ec90742a696a1c1
import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";

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
    <>
      <Drawer anchor="bottom" open={open} onClose={toggleOpen}>
        <button onClick={toggleOpen}>x</button>
        {children}
        <button onClick={toggleOpen}>x</button>
      </Drawer>
    </>
  );
}
