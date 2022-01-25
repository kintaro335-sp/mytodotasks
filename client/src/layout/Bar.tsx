import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import useAuth from 'src/hooks/useAuth';

export default function Bar() {
  const { logged, username } = useAuth();

  return (
    <>
      <AppBar position="absolute">
        <Toolbar>
          {logged && (
            <>
              <IconButton>
                <AccountCircle />
              </IconButton>
              <Typography variant="subtitle1">{username}</Typography>
            </>
          )}
          {!logged && (
            <Button variant="contained" component={NavLink} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
