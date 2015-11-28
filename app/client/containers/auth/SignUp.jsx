/* global Meteor, Roles */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginWithGoogle, loginWithFacebook, setAccountAsCoach, setAccountAsCoachee, signUp } from '../../actions/auth';
import { updatePath } from 'redux-simple-router';

import SignUp from '../../components/auth/SignUp';

function mapStateToProps(state, props) {
  return {
    token: props.params ? props.params.token : null,
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginWithGoogle,
    loginWithFacebook,
    updatePath,
    setAccountAsCoach,
    setAccountAsCoachee,
    signUp,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
