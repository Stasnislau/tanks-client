import {
  AppBar,
  Box,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import React, { useRef } from "react";

const Header = React.forwardRef<HTMLDivElement>((props, ref) => {

  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (gameStarted) {
      intervalId = setInterval(() => {
        setSecondsElapsed((prevSecondsElapsed) => prevSecondsElapsed + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [gameStarted, kills]);
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
            {secondsElapsed}s
          </Typography>
          <LinearProgress
            variant="indeterminate"
            value={kills}
            sx={{ width: 100 }}
          />
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            {kills}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
});
Header.displayName = "Header";

export default Header;
