import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  body: {
    margin: 0
  }
}));

const renderLoginLogout = props => {
  if (!props.isLoggedIn) {
    return <Button color="inherit" onClick={() => window.location.href = '/login'}>Login</Button>
  } else {
    return <Button color="inherit" onClick={() => {
      props.handleLogout();
      window.location.href = '/'
    }
    }>Logout</Button>
  }
}

export default function MenuAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dispatch
          </Typography>

          {renderLoginLogout(props)}
        </Toolbar>
      </AppBar>
    </div>
  );
}