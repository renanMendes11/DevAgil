import React, { useEffect, useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { brown } from '@material-ui/core/colors';

import Header from '../../components/Header';
import api from '../../services/api';
import { isAuthenticated, getUser } from "../../services/auth";

import {Wrapper} from './styles';
// import { Container } from './styles';

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

function EditSheduling({ history}) {
    const classes = useStyles();
    console.log(history);
    const [barbershop_id, setBarbershop_id] = useState(history.location.state.barbershop_id);
    const [sheduling, setSheduling] = useState(history.location.state.sheduling);
    const [customer, setCustomer] = useState(getUser());

    console.log(customer);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    console.log(year, month);
    const [hour, setHour] = useState(history.location.state.sheduling.hour.slice(0,2));
    const [day, setDay] = useState(history.location.state.sheduling.date.slice(8,10));


    useEffect(()=>{
        if(!isAuthenticated()){
            history.push('/login');
        }
    },[]);

    async function handleSubmit(e){
        e.preventDefault();

        const shedulingObj = {
            sheduling: {
                customer_id: customer.id,
                barbershop_client_id: barbershop_id,
                month: months[month],
                year: year.toString(),
                day,
                hour,
                minutes: "00",
            }
        }

        try {
            const response = await api.put(`/shedulings/${sheduling.id}`, shedulingObj);
            console.log(response.data);
            history.push('/');

        }catch(err){
            console.log(err);
        }
    }
  return (
        <Wrapper>
            <Header user={getUser()} history={history}/>
            <Container component="main" fixed>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <CalendarToday/>
                    </Avatar>
                    <h1>
                        Editar Agendamento na Barbearia
                    </h1>
                    <form className={classes.form} noValidate>
                    <TextField
                        defaultValue={day}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Dia"
                        name="day"
                        type="text"
                        autoFocus
                        onChange={(e) => setDay(e.target.value)}
                    />
                    <TextField
                        defaultValue={hour}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Hora"
                        type="text"
                        autoFocus
                        onChange={(e) => setHour(e.target.value)}
                    />
                    <Button
                        type="submit"
                        color="primary"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        onClick={e => handleSubmit(e)}
                    >
                        Editar
                    </Button>
                    </form>
                </div>
            </Container>

        </Wrapper>
    );
}

export default EditSheduling;