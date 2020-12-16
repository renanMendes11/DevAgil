import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import Header from '../../components/Header';

import api from '../../services/api';
import { getUser } from "../../services/auth";

import {Wrapper} from './styles';

const useStyles = makeStyles({
  table: {
    width: 650,
    alignSelf: 'center',
},
containerTable :{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginLeft: 320,
    width: '50%',
},
title:{
    marginBottom: 20
}
});

function MyShedulings({ history }) {

    const [sheduling, setSheduling] = useState(history.location.state.sheduling);
    // console.log(history.location.state.sheduling);
    
    useEffect(()=>{
      
    }, []);

    const classes = useStyles();

  return (
        <Wrapper>
           <Header user={getUser()} history={history}/>
           <div className={classes.containerTable}>
                <h3 className={classes.title} >Agendamento</h3>
                <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Barbearia</TableCell>
                        <TableCell align="right">Data</TableCell>
                        <TableCell align="right">Hora</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                        <TableCell  component="th" scope="row">
                            {sheduling.id}
                        </TableCell>
                        <TableCell align="right">{sheduling.nameBarbershop}</TableCell>
                        <TableCell align="right">{sheduling.date}</TableCell>
                        <TableCell align="right">{sheduling.hour}</TableCell>
                        </TableRow>
                    
                    </TableBody>
                </Table>
                </TableContainer>
                {/* <div>dsa</div> */}
            </div>
        </Wrapper>
    );
}

export default MyShedulings;