import {
  AppBar,
  Box,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { headerInterface } from "../../pages/api/interfaces";

const Header = React.forwardRef<HTMLDivElement, headerInterface>((props, ref) => {
  return (
    <AppBar position="static" ref={ref}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: "Bebas Neue" }}
        >
          Tanks Web
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "5%" }}>
          <Typography variant="subtitle1" sx={{ mr: 1 }}>
            {props.secondsElapsed}s
          </Typography>
          <LinearProgress
            variant="indeterminate"
            value={props.kills}
            sx={{ width: 100 }}
          />
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            {props.kills}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
});
Header.displayName = "Header";

export default Header;
