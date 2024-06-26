import React, { useState } from "react";
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
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isAuthenticated, logout } = useAuth();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
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
                <MenuItem
                  component={RouterLink}
                  to="/turnos/crear"
                  onClick={handleMenuClose}
                >
                  Crear Turno
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
                  to="/turnos/actualizar"
                  onClick={handleMenuClose}
                >
                  Actualizar Turno
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to="/turnos/cancelar"
                  onClick={handleMenuClose}
                >
                  Cancelar Turno
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to="/recetas/descargar"
                  onClick={handleMenuClose}
                >
                  Descargar Receta
                </MenuItem>
                {isAuthenticated ? (
                  <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                ) : (
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

              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex" }}>
              <Button color="inherit" component={RouterLink} to="/turnos/crear">
                Crear Turno
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
                to="/turnos/actualizar"
              >
                Actualizar Turno
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/turnos/cancelar"
              >
                Cancelar Turno
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/recetas/descargar"
              >
                Descargar Receta
              </Button>
              {isAuthenticated ? (
                <Button color="inherit" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              ) : (
                <>
                  <Button color="inherit" component={RouterLink} to="/register">
                    Registrarme
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/">
                    Iniciar Sesión
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
