import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { logout } from 'src/api/users';
import useAuth from 'src/hooks/useAuth';

export default function Bar() {
  const { logged, username, checkAuth } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef(null);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="absolute">
        <Toolbar>
          {logged && (
            <>
              <IconButton onClick={clickOpen} ref={menuRef}>
                <AccountCircle />
              </IconButton>
              <Typography variant="subtitle1">{username}</Typography>
            </>
          )}
          {!logged && (
            <>
              <Button variant="contained" component={NavLink} to="/login">
                Login
              </Button>
              <Button variant="contained" component={NavLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Menu open={open} onClose={clickClose} anchorEl={menuRef.current}>
        <MenuItem component={NavLink} to="/" onClick={() => clickClose()}>
          Home
        </MenuItem>
        <MenuItem component={NavLink} to="/passwd" onClick={() => clickClose()}>
          Change Password
        </MenuItem>
        <MenuItem
          onClick={async () => {
            clickClose();
            await logout();
            await checkAuth();
          }}
        >
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
}
