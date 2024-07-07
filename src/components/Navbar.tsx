import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import decodeToken from "../utils/decodeToken";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [role, setRole] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = decodeToken(token);
      setRole(userRole);
    }
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="mb-10">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button component={RouterLink} to="/dashboard" color="inherit">
              AlMedin
            </Button>
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {role === "ADMIN" && (
                  <>
                    <MenuItem
                      component={RouterLink}
                      to="/dashboard"
                      onClick={handleMenuClose}
                    >
                      Dashboard
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/turnos"
                      onClick={handleMenuClose}
                    >
                      Turnos
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/especialistas"
                      onClick={handleMenuClose}
                    >
                      Especialistas
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/turnos/crear"
                      onClick={handleMenuClose}
                    >
                      Crear Turno
                    </MenuItem>
                  </>
                )}
                {role === "PATIENT" && (
                  <>
                    <MenuItem
                      component={RouterLink}
                      to="/turnos"
                      onClick={handleMenuClose}
                    >
                      Mis Turnos
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/especialistas"
                      onClick={handleMenuClose}
                    >
                      Especialistas
                    </MenuItem>
                  </>
                )}
                {role === "AUTHORIZED_PATIENT" && (
                  <>
                    <MenuItem
                      component={RouterLink}
                      to="/turnos"
                      onClick={handleMenuClose}
                    >
                      Mis Turnos
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/especialistas"
                      onClick={handleMenuClose}
                    >
                      Especialistas
                    </MenuItem>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <MenuItem
                      component={RouterLink}
                      to="/register"
                      onClick={handleMenuClose}
                    >
                      Registrarme
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/"
                      onClick={handleMenuClose}
                    >
                      Iniciar Sesión
                    </MenuItem>
                  </>
                )}
                {isAuthenticated && (
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      logout();
                    }}
                  >
                    Cerrar Sesión
                  </MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex" }}>
              {role === "ADMIN" && (
                <>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/dashboard"
                  >
                    Dashboard
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/turnos">
                    Turnos
                  </Button>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/especialistas"
                  >
                    Especialistas
                  </Button>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/turnos/crear"
                  >
                    Crear Turno
                  </Button>
                </>
              )}
              {role === "PATIENT" && (
                <>
                  <Button color="inherit" component={RouterLink} to="/turnos">
                    Mis Turnos
                  </Button>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/especialistas"
                  >
                    Especialistas
                  </Button>
                </>
              )}
              {role === "AUTHORIZED_PATIENT" && (
                <>
                  <Button color="inherit" component={RouterLink} to="/turnos">
                    Mis Turnos
                  </Button>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/especialistas"
                  >
                    Especialistas
                  </Button>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <Button color="inherit" component={RouterLink} to="/register">
                    Registrarme
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/">
                    Iniciar Sesión
                  </Button>
                </>
              )}
              {isAuthenticated && (
                <Button color="inherit" onClick={logout}>
                  Cerrar Sesión
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
