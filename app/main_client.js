/* global Accounts, Meteor */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import moment from 'moment';

import configureStore from './client/store';
import { loadUser } from './client/actions/auth';


require('expose?Tether!tether');
require('bootstrap');
import './client/styles/main.scss';

const store = configureStore();
store.dispatch(loadUser());

Meteor.startup(() => {
  moment.locale('fr');

  render(
    <Provider store={store}>
      <ReduxRouter/>
    </Provider>,
    document.getElementById('root')
  );
});
