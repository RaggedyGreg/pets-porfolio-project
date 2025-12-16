import { Outlet } from "react-router";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import variables from '../../scss/variables.module.scss';
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export const Layout = () => (
  <>
    <AppBar position="static" sx={{ backgroundColor: variables.primaryColor  }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Pet Manager
        </Typography>
        <ThemeToggle />
      </Toolbar>
    </AppBar>
    <Box>
      <Outlet />
    </Box>
  </>
);
