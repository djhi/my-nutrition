import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearNotification } from '../actions/notifications';
import { logout } from '../actions/auth';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    locale: state.app.locale,
    loggingIn: state.auth.loggingIn,
    messages: state.app.messages,
    notification: state.notification,
    title: state.app.title,
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearNotification,
    logout,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
