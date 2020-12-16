import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { brown } from '@material-ui/core/colors';

import api from '../../services/api';
import { login } from "../../services/auth";
import {Wrapper} from './styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.common.black,
  },
  form: {
    width: '40%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input:{
    color: theme.palette.getContrastText(brown[500]),
  }
}));


export default function SignIn({ history }) {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fieldNotValid, setFieldNotValid] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();

    try {
      const response = await api.post('/sessions', {
        email,
        password,
      })
      console.log(response.data);
      login(response.data);
      history.push('/', { user: response.data });

    }catch(err){
      setFieldNotValid(true);
    }
  }
  return (
    <Wrapper>
    <Container component="main" fixed>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <h1>
          Sign in
        </h1>
        <form className={classes.form} noValidate>
          <TextField
            error={fieldNotValid}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            error={fieldNotValid}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={e => handleSubmit(e)}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Não tem conta? Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </Wrapper>
  );
}
