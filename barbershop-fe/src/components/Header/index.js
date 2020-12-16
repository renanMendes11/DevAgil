import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';

import { isAuthenticated, logout } from "../../services/auth";
import { Link } from 'react-router-dom';

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
  item: {
    marginRight: theme.spacing(10),
    cursor: 'pointer',
  },
  lastItem: {
    marginRight: theme.spacing(40),
    cursor: 'pointer',
  }
}));

export default function Header(props) { 
  console.log(props)
  const classes = useStyles();
  const {user} = props;
  const {history} = props;

  
  function handleShedulings(e){
    e.preventDefault();
    history.push('/');
  }

  function handleBarbershops(e){
    e.preventDefault();
    history.push('/barbershops', { user: user });
  }

  function handleSignOut(e){
    e.preventDefault();
    logout();
    history.push('/login');
  }

  return (
      <AppBar position="static">
        <Toolbar >
          {/* <div className={classes.toolbar}> */}
            <Typography variant="h6" className={classes.title}>
              {`Barbershop - Olá, ${props.user.name}` }
            </Typography>
            {
              props.user['cpf'] ? (
                <>
                  <Link className={classes.item} to='/barbershops'> Barbearias </Link> 
                </>
              ):(
                <></>
              )
            }
            {/* <Typography variant="h7" className={classes.item} > */}
            {/* </Typography> */}
            {/* <Typography variant="h7" className={classes.lastItem} onClick={e => handleShedulings(e)}> */}
            <Link className={classes.lastItem} to='/'>Meus agendamentos </Link> 
            {/* </Typography> */}
          {/* </div> */}
            {
                isAuthenticated() && (                  
                    <>
                        {/* <Link to='/login' onClick={logout()}>
                          Sair
                        </Link> */}
                        Sair
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={e => handleSignOut(e)}
                            color="inherit"
                        >
                          <ExitToApp />
                        </IconButton>
                    </>
                )
            }
            
        </Toolbar>
      </AppBar>
  );
}
