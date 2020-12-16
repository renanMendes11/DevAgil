import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Header from '../../components/Header';
import api from '../../services/api';
import { isAuthenticated, getUser } from "../../services/auth";

import {Wrapper} from './styles';

const useStyles = makeStyles({
    root: {
      margin: 30,
      width: 275,
    },
    containerCards: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

function Barbershops({ history }) {
    const classes = useStyles();
    const [barbershops, setBarbershops] = useState([]);

    useEffect(()=>{
        if(!isAuthenticated()){
            history.push('/login');
        }
        async function loadBarberShops(){
            try {
                const response = await api.get('/barbershop_clients');
                console.log(response.data);
                setBarbershops(response.data);
            }catch(err){
                
            }
        }
        loadBarberShops();
    },[]);

    function handleNewSheduling(e, barbershop){
        e.preventDefault();

        history.push('/new-sheduling', {barbershop: barbershop});
    }

  return (
        <Wrapper>
            <Header user={getUser()} history={history}/>
            <div className={classes.containerCards}>
                {
                    barbershops.map(barbershop => (
                        <Card className={classes.root} key={barbershop.id}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {barbershop.name}
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Telefone: {barbershop.phone}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={e => handleNewSheduling(e, barbershop)}>Agendar</Button>
                            </CardActions>
                        </Card>
                    ))
                }
            </div>
        </Wrapper>
    );
}

export default Barbershops;