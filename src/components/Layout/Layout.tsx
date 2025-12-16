import { Outlet } from "react-router";
import { AppBar, Box, Toolbar, Typography, Link } from "@mui/material";
import variables from '../../scss/variables.module.scss';
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { useTranslation } from "react-i18next";

export const Layout = () => {
  const { t } = useTranslation();
  
  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <Link
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 999,
          '&:focus': {
            left: '10px',
            top: '10px',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none'
          }
        }}
      >
        {t("layout.skipToContent", "Skip to main content")}
      </Link>
      
      <AppBar position="static" sx={{ backgroundColor: variables.primaryColor  }} component="header">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Pet Manager
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Box id="main-content" component="main">
        <Outlet />
      </Box>
    </>
  );
};
