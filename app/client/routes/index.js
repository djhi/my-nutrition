import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../containers/App';
import Home from '../components/Home';

import Coachees from '../containers/coach/Coachees';
import Dashboard from '../containers/coach/Dashboard';
import InviteCoachee from '../containers/coach/InviteCoachee';

import InviteCoach from '../containers/coachee/InviteCoach';
import Planning from '../containers/coachee/Planning';

import AccountType from '../containers/auth/AccountType';
import SignIn from '../containers/auth/SignIn';
import SignUp from '../containers/auth/SignUp';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="planning/:userId/:userName/:date" component={Planning}/>
    <Route path="planning/:userId/:userName" component={Planning}/>
    <Route path="planning/:date" component={Planning}/>
    <Route path="planning" component={Planning}/>
    <Route path="invite-coach" component={InviteCoach}/>
    <Route path="dashboard" component={Dashboard}>
      <IndexRoute component={Coachees}/>
      <Route path="invite" component={InviteCoachee}/>
    </Route>
    <Route path="account-type" component={AccountType}/>
    <Route path="account-type/:token" component={AccountType}/>
    <Route path="sign-in" component={SignIn}/>
    <Route path="sign-up" component={SignUp}/>
    <Route path="sign-up/:token" component={SignUp}/>
  </Route>
);
