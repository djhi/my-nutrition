/* global Meteor, Roles */
import React, { PropTypes } from 'react';
import AppHeader from '../components/AppHeader';
import Notification from '../components/Notification';

const App = ({ children, clearNotification, notification, loggingIn, logout, title, user }) => (
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
  );

App.propTypes = {
  children: PropTypes.node,
  clearNotification: PropTypes.func.isRequired,
  notification: PropTypes.object,
  loggingIn: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  title: PropTypes.string,
  user: PropTypes.object,
};

App.defaultProps = {
  title: 'Ma nutrition',
};

export default App;
