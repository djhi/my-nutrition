/* global Meteor, Roles */
import React, { PropTypes } from 'react';
import { IntlProvider } from 'react-intl';

import AppHeader from '../components/AppHeader';
import Notification from '../components/Notification';

const App = ({ children, clearNotification, locale, loggingIn, logout, messages, notification, title, user }) => (
  <IntlProvider locale={locale} messages={messages}>
    <div className="container-fluid full-height">
      <div className="row">
        <div className="col-xs-12">
          <AppHeader
            title={title}
            loggingIn={loggingIn}
            user={user}
            onLogout={logout}
          />
      </div>
      </div>
      <div className="row">
        <div className="col-xs-12 main-content">
          {children}
          {notification && notification.level &&
            <Notification
              level={notification.level}
              onDismiss={clearNotification}
            >{notification.message}</Notification>
          }
        </div>
      </div>
    </div>
  </IntlProvider>
);

App.propTypes = {
  children: PropTypes.node,
  clearNotification: PropTypes.func.isRequired,
  notification: PropTypes.object,
  loggingIn: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.object,
};

export default App;
