/* global Meteor, Roles */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearNotification } from '../actions/notifications';
import { logoutFactory } from '../actions/auth';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    title: state.app.title,
    user: state.auth.user,
    loggingIn: state.auth.loggingIn,
    notification: state.notification,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearNotification,
    logout: logoutFactory(Meteor),
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
