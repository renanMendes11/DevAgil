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
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(7),
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


export default function SignUp({ history }) {
  const classes = useStyles();
  const [accountType, setAccountType] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fieldNotValid, setFieldNotValid] = useState(false);

  const [street, setStreet] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [city, setCity] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [number, setNumber] = useState("");

  const [nameCustomer, setNameCustomer] = useState("");
  const [phoneCustomer, setPhoneCustomer] = useState("");
  const [cpf, setCpf] = useState("");

  const [nameBarbershop, setNameBarbershop] = useState("");
  const [phoneBarbershop, setPhoneBarbershop] = useState("");


  async function handleSubmit(e){
    e.preventDefault();
    console.log(accountType, confirmationPassword, password, email);
    try {
        //users
        const userObj = {
          user: {
            email,
            password,
            password_confirmation: confirmationPassword
          }
        }
      const responseUsers = await api.post('/users', userObj);
      console.log(responseUsers.data);
      //address
      const address = {
          street,
          stateValue,
          city,
          zip_code,
          number
      }
      const responseAddress = await api.post('/addresses', address);
      console.log(responseAddress.data);

      // customer or barbershop
      if(accountType === 'customer') {
          const customer = {
              name: nameCustomer,
              cpf,
              phone: phoneCustomer,
              address_id: responseAddress.data.id,
              user_id: responseUsers.data.id,
          }
          const responseCustomer = await api.post('/customers', customer);
          console.log(responseCustomer.data);

      }else if(accountType ==='barbershop'){
          const barbershop = {
            name: nameBarbershop,
            phone: phoneBarbershop,
            address_id: responseAddress.data.id,
            user_id: responseUsers.data.id,
        }
        const responseBarbershop = await api.post('/barbershop_clients', barbershop);
        console.log(responseBarbershop.data);  
      }


      history.push('/login');

    }catch(err){
      setFieldNotValid(true);
    }
  }
  return (
    <Container component="main" fixed>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <h1>
          Criar Conta
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
        <TextField
            // error={password === confirmationPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Confirme sua senha"
            type="password"
            autoComplete="current-password_confirmation"
            onChange={(e) => setConfirmationPassword(e.target.value)}
        />

        <FormControl component="fieldset">
            <FormLabel component="legend">Criar conta como:</FormLabel>
            <RadioGroup aria-label="accountType" name="accountType" value={accountType} onChange={e => setAccountType(e.target.value)}>
                <FormControlLabel value="barbershop" control={<Radio />} label="Barbearia" />
                <FormControlLabel value="customer" control={<Radio />} label="Cliente" />
            </RadioGroup>
        </FormControl>

        
        <FormLabel component="legend">Seus dados</FormLabel>
        {
            accountType === 'customer' && (
                <>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="nameCustomer"
                        label="Nome"
                        type="text"
                        onChange={(e) => setNameCustomer(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="cpf"
                        label="CPF"
                        type="text"
                        onChange={(e) => setCpf(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="phone"
                        label="Telefone"
                        type="text"
                        onChange={(e) => setPhoneCustomer(e.target.value)}
                    />

                </>
            )
        }
        {
            accountType === 'barbershop' && (
                <>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="nameBarbershop"
                        label="Nome"
                        type="text"
                        onChange={(e) => setNameBarbershop(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="phone"
                        label="Telefone"
                        type="text"
                        onChange={(e) => setPhoneBarbershop(e.target.value)}
                    />
                </>
            )
        }

<FormLabel component="legend">Endereço</FormLabel>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="street"
            label="Rua"
            type="text"
            onChange={(e) => setStreet(e.target.value)}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="stateValue"
            label="Estado"
            type="text"
            onChange={(e) => setStateValue(e.target.value)}
        />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="city"
            label="Cidade"
            type="text"
            onChange={(e) => setCity(e.target.value)}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="zip_code"
            label="CEP"
            type="text"
            onChange={(e) => setZipCode(e.target.value)}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="number"
            label="Número"
            type="text"
            onChange={(e) => setNumber(e.target.value)}
        />


          <Button
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={e => handleSubmit(e)}
          >
            Criar
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Já tem conta? Faça login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
