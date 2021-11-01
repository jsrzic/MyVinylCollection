import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { ColorModeContext } from "../util/utils";

function ToggleTheme({ theme }) {
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Tooltip title={theme.palette.mode}>
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Tooltip>
  );
}

export default ToggleTheme;
