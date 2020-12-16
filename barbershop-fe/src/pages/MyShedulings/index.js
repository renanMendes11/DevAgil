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
import { isAuthenticated, getUser } from "../../services/auth";

import { DataGrid } from '@material-ui/data-grid';

import {Wrapper} from './styles';

const useStyles = makeStyles({
  table: {
    width: 650,
    alignSelf: 'center',
  },
  containerTable :{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginLeft: 320,
    width: '50%',
  }
});

function MyShedulings({ history }) {
    const [shedulings, setShedulings] = useState([]);
    const [auxRows, setAuxRows] = useState([]);
    
    useEffect(()=>{
      async function loadShedulings(){
        const user = getUser();
        if(user['cpf']){
          const responseCustomer = api.get(`/my_shedulings_customer/${user.id}`)
            .then(responseCustomer => {
              console.log(responseCustomer.data);
              setShedulings(responseCustomer.data);
              Promise.all(
                responseCustomer.data.map(async sheduling => {
                  const response = await api.get(`/barbershop_clients/${sheduling.barbershop_client_id}`);
                  
                  return {
                    sheduling,
                    nameBarbershop: response.data.name,
                  }
                })
                ).then((values) => {
                  console.log(values);
                  setAuxRows(values);
                });
              });
            }else {
              const responseBarbershop = api.get(`/my_shedulings_barbershopClient/${user.id}`)
              .then(responseBarbershop => {
                console.log(responseBarbershop);
                setShedulings(responseBarbershop.data);
                Promise.all(
                  responseBarbershop.data.map(async sheduling => {
                    const response = await api.get(`/customers/${sheduling.customer_id}`);
                    
                    return {
                      sheduling,
                      nameCustomer: response.data.name,
                  }
                })
                ).then((values) => {
                  console.log(values);
                  setAuxRows(values);
              });
            });
        }
      }
      loadShedulings();
    }, []);
    

    const rows = auxRows.map((auxRow) => {
      if(auxRow['nameBarbershop']){
        return {
          id: auxRow.sheduling.id,
          nameBarbershop: auxRow.nameBarbershop,
          date: auxRow.sheduling.time.slice(0,10),
          hour: auxRow.sheduling.time.slice(11,16),
        }
      }else {
        return {
          id: auxRow.sheduling.id,
          nameCustomer: auxRow.nameCustomer,
          date: auxRow.sheduling.time.slice(0,10),
          hour: auxRow.sheduling.time.slice(11,16),
        }
      }
    });

    const classes = useStyles();

    function handleSheduling(e, row){
      e.preventDefault();
      history.push('/sheduling', {sheduling: row});
    }

    async function handleShedulingDelete(e, row){
      e.preventDefault();
      const response = await api.delete(`/shedulings/${row.id}`);
      // setShedulings(shedulings);
    }

    function handleShedulingEdit(e,row, auxRows){
      const auxRow = auxRows.filter(auxrow => auxrow.sheduling.id === row.id);
      console.log(auxRow);
      e.preventDefault();
      history.push('/edit-sheduling', {sheduling: row, barbershop_id: auxRow[0].sheduling.barbershop_client_id});
    }

  return (
        <Wrapper>
           <Header user={getUser()} history={history}/>
           <div className={classes.containerTable}>
           <TableContainer component={Paper}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    {getUser()['nameBarbershop'] ? (
                      <TableCell align="right"> Barbearia </TableCell>
                      ) : (
                        <TableCell align="right"> Cliente </TableCell>
                    )}
                    <TableCell align="right">Data</TableCell>
                    <TableCell align="right">Hora</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                  {rows.map((row) => (
                    <TableBody style={{cursor: "pointer"}}>
                        <TableRow key={row.id} >
                          <TableCell component="th" scope="row" onClick={e => handleSheduling(e, row)}>
                            {row.id}
                          </TableCell>
                          <TableCell onClick={e => handleSheduling(e, row)} align="right">{row['nameCustomer'] ? row.nameCustomer: row.nameBarbershop }</TableCell>
                          <TableCell onClick={e => handleSheduling(e, row)} align="right">{row.date}</TableCell>
                          <TableCell onClick={e => handleSheduling(e, row)} align="right">{row.hour}</TableCell>
                          <TableCell onClick={e => handleShedulingDelete(e, row)} align="right">Excluir</TableCell >
                          <TableCell onClick={e => handleShedulingEdit(e, row, auxRows)} align="right">Editar</TableCell >
                        </TableRow>
                    </TableBody>
                  ))}
              </Table>
            </TableContainer>
            {/* <div>dsa</div> */}
            </div>
        </Wrapper>
    );
}

export default MyShedulings;