import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Barbershops from './pages/Barbershops';
import Login from './pages/Login';
import NewSheduling from './pages/NewSheduling';
import EditSheduling from './pages/EditSheduling';
import Sheduling from './pages/Sheduling';
import MyShedulings from './pages/MyShedulings';
import SignUp from './pages/SignUp';

export default function routes() {
  return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MyShedulings} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/new-sheduling" component={NewSheduling} />
            <Route path="/edit-sheduling" component={EditSheduling} />
            <Route path="/sheduling" component={Sheduling} />
            <Route path="/barbershops" component={Barbershops} />
        </Switch>
      </BrowserRouter>
  );
}