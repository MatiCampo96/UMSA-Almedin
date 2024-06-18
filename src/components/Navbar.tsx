import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className='mb-10'>
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
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={RouterLink} to="/create-appointment" onClick={handleMenuClose}>Crear Turno</MenuItem>
                <MenuItem component={RouterLink} to="/specialists" onClick={handleMenuClose}>Especialistas</MenuItem>
                <MenuItem component={RouterLink} to="/update-appointment" onClick={handleMenuClose}>Actualizar Turno</MenuItem>
                <MenuItem component={RouterLink} to="/cancel-appointment" onClick={handleMenuClose}>Cancelar Turno</MenuItem>
                <MenuItem component={RouterLink} to="/download-prescription" onClick={handleMenuClose}>Descargar Receta</MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <Button color="inherit" component={RouterLink} to="/create-appointment">Crear Turno</Button>
              <Button color="inherit" component={RouterLink} to="/specialists">Especialistas</Button>
              <Button color="inherit" component={RouterLink} to="/update-appointment">Actualizar Turno</Button>
              <Button color="inherit" component={RouterLink} to="/cancel-appointment">Cancelar Turno</Button>
              <Button color="inherit" component={RouterLink} to="/download-prescription">Descargar Receta</Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
