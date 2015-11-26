/* global Accounts, Meteor */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import moment from 'moment';

import configureStore from './client/store';
import { loadUser } from './client/actions/auth';

// Tether is required by bootstrap components such as tooltips and popovers
// It must be loaded first and exposed globally (we use the expose-loader for webpack)
require('expose?Tether!tether');

// Requiring bootstrap here ensure we can use javascript based components such as tooltips and popovers
require('bootstrap');

import './client/styles/main.scss';

const store = configureStore();

// Dispatch the loadUser action immediatly so that the current user is available
// in the global state reactivly
store.dispatch(loadUser());

// We must wait for Meteor to be ready before trying to render React otherwise,
// our main template from ../meteor_core/meteor.html would not be available
Meteor.startup(() => {
  moment.locale('fr');

  render(
    <Provider store={store}>
      <ReduxRouter/>
    </Provider>,
    document.getElementById('root')
  );
});
