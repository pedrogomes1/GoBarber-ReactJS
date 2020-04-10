import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route'; // Não importo mais do router dom, já que criei esse componente q chama ele
import Dashboard from '../pages/Dashboard';
import Signin from '../pages/SignIn';
import Signup from '../pages/SignUp';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/register" component={Signup} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
