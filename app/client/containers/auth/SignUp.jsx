/* global Meteor, Roles */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginWithGoogle, loginWithFacebook, setAccountAsCoach, setAccountAsCoachee, signUp } from '../../actions/auth';
import { pushState } from 'redux-router';

import SignUp from '../../components/auth/SignUp';

function mapStateToProps(state) {
  return {
    token: state.router.params.token,
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginWithGoogle,
    loginWithFacebook,
    pushState,
    setAccountAsCoach,
    setAccountAsCoachee,
    signUp,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
